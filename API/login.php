<?php
require_once __DIR__ . '/db.php';

// Headers CORS
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
    
    // Buscar usuário por email
    $stmt = $pdo->prepare('SELECT * FROM profiles WHERE email = ? AND ativo = 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user) {
        // Login simples por email (sem verificação de senha por enquanto)
        $token = bin2hex(random_bytes(16));
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Login realizado com sucesso',
            'token' => $token, 
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Usuário não encontrado ou inativo'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro interno do servidor',
        'error' => $e->getMessage()
    ]);
}
?>

