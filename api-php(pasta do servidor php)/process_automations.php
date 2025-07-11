<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM mailbox_automations WHERE active = 1 AND next_run <= NOW() ORDER BY next_run ASC LIMIT 10");
    $automations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $results = [];

    foreach ($automations as $automation) {
        $settingsStmt = $pdo->prepare("SELECT * FROM mailbox_settings WHERE user_id = ?");
        $settingsStmt->execute([$automation['user_id']]);
        $settings = $settingsStmt->fetch(PDO::FETCH_ASSOC);

        if (!$settings || empty($settings['smtp_host'])) {
            $pdo->prepare("INSERT INTO mailbox_automation_logs (automation_id, status, details, emails_sent, emails_failed) VALUES (?, 'error', ?, 0, 0)")
                ->execute([$automation['id'], json_encode(['error' => 'Configura\xC3\xA7\xC3\xB5es SMTP n\xC3\xA3o encontradas'])]);
            $results[] = [
                'automationId' => $automation['id'],
                'status' => 'error',
                'error' => 'SMTP settings not found'
            ];
            continue;
        }

        $filter = json_decode($automation['recipients_filter'] ?? '[]', true);
        $recipients = $filter['emails'] ?? [];

        if (empty($recipients)) {
            $pdo->prepare("INSERT INTO mailbox_automation_logs (automation_id, status, details, emails_sent, emails_failed) VALUES (?, 'error', ?, 0, 0)")
                ->execute([$automation['id'], json_encode(['error' => 'Nenhum destinat\xC3\xA1rio encontrado'])]);
            $results[] = [
                'automationId' => $automation['id'],
                'status' => 'error',
                'error' => 'No recipients found'
            ];
            continue;
        }

        $emailsSent = 0;
        $emailsFailed = 0;
        $errors = [];

        foreach ($recipients as $recipient) {
            try {
                $insert = $pdo->prepare("INSERT INTO mailbox_messages (user_id, subject, body, from_email, to_email, folder, status, created_at) VALUES (?, ?, ?, ?, ?, 'sent', 'sent', NOW())");
                $insert->execute([
                    $automation['user_id'],
                    $automation['subject'],
                    $automation['body'],
                    $settings['smtp_username'] ?? '',
                    $recipient
                ]);
                $emailsSent++;
            } catch (Exception $e) {
                $emailsFailed++;
                $errors[] = $recipient . ': ' . $e->getMessage();
            }
        }

        $status = ($emailsSent > 0 && $emailsFailed === 0) ? 'success' : ($emailsSent === 0 ? 'error' : 'partial');
        $pdo->prepare("INSERT INTO mailbox_automation_logs (automation_id, status, details, emails_sent, emails_failed) VALUES (?, ?, ?, ?, ?)")
            ->execute([
                $automation['id'],
                $status,
                json_encode(['recipients_processed' => count($recipients), 'errors' => $errors]),
                $emailsSent,
                $emailsFailed
            ]);

        if (!empty($automation['schedule_cron'])) {
            $nextRun = date('Y-m-d H:i:s', strtotime('+1 hour'));
            $pdo->prepare("UPDATE mailbox_automations SET next_run = ? WHERE id = ?")
                ->execute([$nextRun, $automation['id']]);
        } elseif (!empty($automation['schedule_once'])) {
            $pdo->prepare("UPDATE mailbox_automations SET active = 0, next_run = NULL WHERE id = ?")
                ->execute([$automation['id']]);
        }

        $results[] = [
            'automationId' => $automation['id'],
            'status' => $status,
            'emailsSent' => $emailsSent,
            'emailsFailed' => $emailsFailed
        ];
    }

    echo json_encode([
        'success' => true,
        'processed' => count($automations),
        'results' => $results
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
