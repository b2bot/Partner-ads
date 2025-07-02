<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        http_response_code(400 );
        echo json_encode([
            'status' => 'error',
            'message' => 'Email e senha são obrigatórios'
        ]);
        exit;
    }
    
    // Buscar usuário no banco
    $stmt = $pdo->prepare('SELECT * FROM profiles WHERE email = ? AND ativo = 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        http_response_code(401 );
        echo json_encode([
            'status' => 'error',
            'message' => 'Credenciais inválidas'
        ]);
        exit;
    }
    
    // Gerar token
    $token = bin2hex(random_bytes(32));
    
    // ✅ CORREÇÃO: Conversão correta para boolean
    $userData = [
        'id' => $user['id'],
        'nome' => $user['nome'],
        'email' => $user['email'],
        'role' => $user['role'],
        'ativo' => $user['ativo'] == 1,
        'is_root_admin' => $user['is_root_admin'] == 1,  // ✅ CORREÇÃO AQUI
        'created_at' => $user['created_at'],
        'updated_at' => $user['updated_at']
    ];
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Login realizado com sucesso',
        'token' => $token,
        'user' => $userData
    ]);
    
} catch (Exception $e) {
    http_response_code(500 );
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro interno do servidor'
    ]);
}
?>
