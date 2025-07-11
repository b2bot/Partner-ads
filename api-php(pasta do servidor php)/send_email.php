<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$to = $input['to'] ?? null;
$subject = $input['subject'] ?? '';
$body = $input['body'] ?? '';
$userId = $input['user_id'] ?? null;

if (!$to || !$userId) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO mailbox_messages (user_id, subject, body, from_email, to_email, folder, status, created_at) VALUES (?, ?, ?, ?, ?, 'sent', 'sent', NOW())");
    $stmt->execute([
        $userId,
        $subject,
        $body,
        $input['from_email'] ?? '',
        $to
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Email enviado com sucesso',
        'messageId' => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
