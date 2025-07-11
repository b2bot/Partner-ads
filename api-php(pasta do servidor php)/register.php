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
    $nome = $input['nome'] ?? '';
    $role = $input['role'] ?? 'client';
    
    // Verificar se email já existe
    $stmt = $pdo->prepare('SELECT id FROM profiles WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Email já cadastrado'
        ]);
        exit;
    }
    
    // Inserir novo usuário
    $stmt = $pdo->prepare('INSERT INTO profiles (email, nome, role, ativo) VALUES (?, ?, ?, 1)');
    $stmt->execute([$email, $nome, $role]);
    
    $id = $pdo->lastInsertId();
    
    // Buscar usuário criado
    $stmt = $pdo->prepare('SELECT * FROM profiles WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    
    $token = bin2hex(random_bytes(16));
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Usuário criado com sucesso',
        'token' => $token, 
        'user' => $user
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro interno do servidor',
        'error' => $e->getMessage()
    ]);
}
?>

