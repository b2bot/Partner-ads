<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

try {
    /* --------- Só permite GET --------- */
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        exit;
    }

    /* --------- user_id ou id --------- */
    $userId = $_GET['user_id'] ?? $_GET['id'] ?? '';
    if (!$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'id é obrigatório']);
        exit;
    }

    $pdo = getConnection();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        SELECT id, nome, email, role, is_root_admin, ativo, created_at
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

    /* --------- Aliases --------- */
    $profileRole        = $user['role'];
    $profileIsRootAdmin = (bool)$user['is_root_admin'];

    echo json_encode([
        'success'          => true,

        /* ——— campos que o guard de rotas lê na raiz ——— */
        'role'             => $profileRole,           // ← ADICIONADO
        'isRootAdmin'      => $profileIsRootAdmin,    // ← ADICIONADO
        'profileRole'      => $profileRole,
        'profileIsRootAdmin'=> $profileIsRootAdmin,

        /* objeto completo usado em telas de perfil */
        'profile' => array_merge($user, [
            'profileRole'        => $profileRole,
            'profileIsRootAdmin' => $profileIsRootAdmin
        ])
    ]);

} catch (Throwable $e) {
    error_log("Erro em profiles.php: ".$e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor']);
}