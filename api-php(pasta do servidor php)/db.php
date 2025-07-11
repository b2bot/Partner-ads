<?php
// Arquivo db.php - Conexão com o banco de dados MySQL
// Baseado no sistema que funciona do usuário

// CONFIGURAÇÃO 1 - Tentar com localhost
$host = 'localhost';
$dbname = 'app2partnerb2b';
$username = 'app2partnerb2b';
$password = 'Vk280112030616';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    // Se falhar com localhost, tentar com IP do servidor
    try {
        $host = '127.0.0.1';
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    } catch (PDOException $e2) {
        // Se ainda falhar, tentar com host específico da hospedagem
        try {
            $host = 'srv-200-9-22-2.hostoo.io';
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e3) {
            // Log do erro e retorno de erro
            error_log("Erro de conexão com o banco de dados: " . $e3->getMessage());
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro de conexão com o banco de dados',
                'error_code' => 'DB_CONNECTION_ERROR',
                'debug_info' => [
                    'host_tried' => ['localhost', '127.0.0.1', 'srv-200-9-22-2.hostoo.io'],
                    'username' => $username,
                    'database' => $dbname,
                    'last_error' => $e3->getMessage()
                ]
            ]);
            exit;
        }
    }
}

// Função compatível para retornar a conexão
function getConnection() {
    global $pdo;
    return $pdo;
}

// Headers CORS para permitir acesso do frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>