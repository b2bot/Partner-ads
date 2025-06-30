<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();
if ($user && password_verify($password, $user['password'])) {
    $token = bin2hex(random_bytes(16));
    echo json_encode(['token' => $token, 'user' => $user]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
