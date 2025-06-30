<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

function get_input(): array {
    $data = file_get_contents('php://input');
    return $data ? json_decode($data, true) : [];
}

function handle_get(PDO $pdo, string $table): void {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM `$table` WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode($stmt->fetch());
    } else {
        $stmt = $pdo->query("SELECT * FROM `$table`");
        echo json_encode($stmt->fetchAll());
    }
}

function handle_post(PDO $pdo, string $table): void {
    $data = get_input();
    if (empty($data)) { http_response_code(400); echo json_encode(['error' => 'No data']); return; }
    $columns = array_keys($data);
    $placeholders = array_fill(0, count($columns), '?');
    $stmt = $pdo->prepare(
        "INSERT INTO `$table` (" . implode(',', $columns) . ") VALUES (" . implode(',', $placeholders) . ")"
    );
    $stmt->execute(array_values($data));
    echo json_encode(['id' => $pdo->lastInsertId()]);
}

function handle_put(PDO $pdo, string $table): void {
    $data = get_input();
    if (!isset($_GET['id']) || empty($data)) { http_response_code(400); echo json_encode(['error' => 'Missing id or data']); return; }
    $id = $_GET['id'];
    $sets = [];
    $values = [];
    foreach ($data as $k => $v) { $sets[] = "$k = ?"; $values[] = $v; }
    $values[] = $id;
    $stmt = $pdo->prepare("UPDATE `$table` SET " . implode(',', $sets) . " WHERE id = ?");
    $stmt->execute($values);
    echo json_encode(['updated' => $stmt->rowCount()]);
}

function handle_delete(PDO $pdo, string $table): void {
    if (!isset($_GET['id'])) { http_response_code(400); echo json_encode(['error' => 'Missing id']); return; }
    $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(['deleted' => $stmt->rowCount()]);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        handle_get($pdo, $table);
        break;
    case 'POST':
        handle_post($pdo, $table);
        break;
    case 'PUT':
        handle_put($pdo, $table);
        break;
    case 'DELETE':
        handle_delete($pdo, $table);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
}
