<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = password_hash($input['password'] ?? '', PASSWORD_DEFAULT);
$nome = $input['nome'] ?? '';
$role = $input['role'] ?? 'cliente';
$stmt = $pdo->prepare('INSERT INTO users (email, password, nome, role) VALUES (?, ?, ?, ?)');
$stmt->execute([$email, $password, $nome, $role]);
$id = $pdo->lastInsertId();
$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$stmt->execute([$id]);
$user = $stmt->fetch();
$token = bin2hex(random_bytes(16));
echo json_encode(['token' => $token, 'user' => $user]);
