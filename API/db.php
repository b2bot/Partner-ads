<?php
// Arquivo db.php - Conexão com o banco de dados
// Baseado no sistema que funciona do usuário

$host = 'localhost';
$dbname = 'app2partnerb2b';
$username = 'app2partnerb2b'; // SEM @localhost
$password = 'vk280112030616';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro de conexão com o banco de dados',
        'error_code' => 'DB_CONNECTION_ERROR'
    ]);
    exit;
}

// Função compatível para retornar a conexão onde for chamada
function getConnection() {
    global $pdo;
    return $pdo;
}
?>

