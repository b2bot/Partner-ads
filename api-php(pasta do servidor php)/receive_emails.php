<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

try {
    $newEmail = [
        'user_id' => 'user-uuid',
        'subject' => 'Novo email recebido',
        'body' => 'Conteudo do email...',
        'from_email' => 'sender@example.com',
        'from_name' => 'Remetente',
        'to_email' => 'receiver@example.com',
        'folder' => 'inbox',
        'status' => 'unread',
        'created_at' => date('Y-m-d H:i:s')
    ];

    $stmt = $pdo->prepare("INSERT INTO mailbox_messages (user_id, subject, body, from_email, from_name, to_email, folder, status, created_at) VALUES (:user_id, :subject, :body, :from_email, :from_name, :to_email, :folder, :status, :created_at)");
    $stmt->execute($newEmail);

    echo json_encode([
        'success' => true,
        'message' => 'Emails verificados',
        'newEmails' => 1
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
