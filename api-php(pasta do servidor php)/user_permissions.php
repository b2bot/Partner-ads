<?php
require_once __DIR__ . '/db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

try {
    $pdo = getConnection();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /* ========================================================
       1. LISTAR PERMISSÕES (GET)
       ======================================================== */
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        /* ---------- 1-A: via token ---------- */
        $headers = getallheaders();
        $token = isset($headers['Authorization'])
               ? str_replace('Bearer ', '', $headers['Authorization'])
               : null;

        if ($token) {
            $stmt = $pdo->prepare("
                SELECT u.id, u.email, u.role, u.is_root_admin
                  FROM usuarios u
                  JOIN auth_tokens at ON u.id = at.user_id
                 WHERE at.token = ? AND at.expires_at > NOW()
                 LIMIT 1
            ");
            $stmt->execute([$token]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        /* ---------- 1-B: via user_id ---------- */
        if (!$token || !$user) {
            $userId = $_GET['user_id'] ?? null;
            if (!$userId) {
                http_response_code(401);
                echo json_encode(['error' => 'Token ou user_id obrigatório']);
                exit;
            }
            $stmt = $pdo->prepare("
                SELECT id, email, role, is_root_admin
                  FROM usuarios
                 WHERE id = ?
                 LIMIT 1
            ");
            $stmt->execute([$userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$user) {
                http_response_code(404);
                echo json_encode(['error' => 'Usuário não encontrado']);
                exit;
            }
        }

        /* ---------- Permissões ---------- */
        if ($user['is_root_admin'] || $user['role'] === 'admin') {
            $permList = [
                'access_dashboard',
                'access_reports',
                'access_whatsapp',
                'create_campaigns',
                'manage_users'
            ];
        } else {
            $stmt = $pdo->prepare("
                SELECT permission
                  FROM user_permissions
                 WHERE user_id = ? AND granted = 1
            ");
            $stmt->execute([$user['id']]);
            $permList = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'permission');
        }

        /* ---------- Array de objetos que o React espera ---------- */
        $response = array_map(fn ($p) => ['permission' => $p], $permList);

        echo json_encode($response);   // ← formato final
        exit;
    }

    /* ========================================================
       2. CRIAR / ATUALIZAR PERMISSÃO (POST)
       ======================================================== */
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['user_id'], $input['permission'], $input['granted'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos obrigatórios: user_id, permission, granted']);
            exit;
        }

        $stmt = $pdo->prepare("
            INSERT INTO user_permissions (user_id, permission, granted)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE granted = VALUES(granted)
        ");
        $stmt->execute([$input['user_id'], $input['permission'], (int)$input['granted']]);

        echo json_encode(['success' => true, 'message' => 'Permissão salva']);
        exit;
    }

    /* ========================================================
       3. REMOVER PERMISSÃO (DELETE)
       ======================================================== */
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents('php://input'), $input);

        if (!isset($input['user_id'], $input['permission'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos obrigatórios: user_id, permission']);
            exit;
        }

        $stmt = $pdo->prepare("
            DELETE FROM user_permissions
             WHERE user_id = ? AND permission = ?
        ");
        $stmt->execute([$input['user_id'], $input['permission']]);

        echo json_encode(['success' => true, 'message' => 'Permissão removida']);
        exit;
    }

    /* ----- Método não permitido ----- */
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);

} catch (Throwable $e) {
    error_log("Erro em user_permissions.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor']);
}