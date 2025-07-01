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
    $password = password_hash($input['password'] ?? '', PASSWORD_DEFAULT);
    $nome = $input['nome'] ?? '';
    $role = $input['role'] ?? 'client';
    
    // ✅ CORREÇÃO: Usar tabela 'profiles' em vez de 'users'
    $stmt = $pdo->prepare('INSERT INTO profiles (email, nome, role) VALUES (?, ?, ?)');
    $stmt->execute([$email, $nome, $role]);
    
    $id = $pdo->lastInsertId();
    
    $stmt = $pdo->prepare('SELECT * FROM profiles WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    
    $token = bin2hex(random_bytes(16));
    
    echo json_encode(['success' => true, 'token' => $token, 'user' => $user]);
    
} catch (Exception $e) {
    http_response_code(500 );
    echo json_encode(['error' => $e->getMessage()]);
}
?>
