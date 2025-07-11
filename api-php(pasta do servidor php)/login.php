<?php
require_once __DIR__ . '/db.php';

/* DEBUG – desative antes de ir para produção */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/* ----------------------------------------- */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
    exit;
}

try {
    /* --------- INPUT --------- */
    $input = json_decode(file_get_contents('php://input'), true);
    $email = trim($input['email']    ?? '');
    $senha = trim($input['password'] ?? '');

    if (!$email || !$senha) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Email e senha são obrigatórios']);
        exit;
    }

    /* --------- BUSCAR USUÁRIO --------- */
    $pdo = getConnection();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare(
        'SELECT id, nome, email, password, ativo, is_root_admin
           FROM usuarios
          WHERE email = ? AND ativo = 1
          LIMIT 1'
    );
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    /* --------- VERIFICAR SENHA --------- */
    $ok = false;
    if ($user) {
        $hash = $user['password'] ?? '';

        // Detecta hashes gerados por password_hash (bcrypt, argon2, etc.)
        $info = password_get_info($hash);
        if ($info['algo'] !== 0) {                 // Hash moderno suportado
            $ok = password_verify($senha, $hash);
        } else {                                   // Texto puro legado
            $ok = hash_equals($hash, $senha);
        }
    }
    if (!$ok) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Credenciais inválidas']);
        exit;
    }

    /* --------- GERAR TOKEN --------- */
    $token   = bin2hex(random_bytes(32));          // 64 caracteres
    $expires = (new DateTime('+30 days'))->format('Y-m-d H:i:s');

    $insert = $pdo->prepare(
        'INSERT INTO auth_tokens (user_id, token, expires_at, created_at)
         VALUES (?,?,?,NOW())'
    );
    if (!$insert->execute([$user['id'], $token, $expires])) {
        $info = $insert->errorInfo();
        throw new RuntimeException("Erro ao gravar token: {$info[2]}");
    }

    /* --------- RESPOSTA --------- */
    unset($user['password']);                      // não expor hash
    $user['ativo']         = (bool) $user['ativo'];
    $user['is_root_admin'] = (bool) $user['is_root_admin'];

    echo json_encode([
        'status'      => 'success',
        'message'     => 'Login realizado com sucesso',
        'token'       => $token,
        'tokenExpiry' => $expires,
        'user'        => $user
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage(),  // troque por genérico em produção
        'file'    => $e->getFile(),
        'line'    => $e->getLine()
    ]);
}