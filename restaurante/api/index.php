<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_start();

$servername = "mysql";
$username = "administrador";
$password = "1234";
$dbname = "restaurante";

ob_clean();

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $conn->connect_error]));
}

$nombre = $_POST['nombre'] ?? '';
$correo = $_POST['correo'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';

$sql = "INSERT INTO reservas (nombre, correo, mensaje) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

$response = [];
if ($stmt) {
    $stmt->bind_param("sss", $nombre, $correo, $mensaje); 

    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Registro completado';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $stmt->error;
    }

    $stmt->close();
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error en la preparación de la declaración: ' . $conn->error;
}

$conn->close();

ob_end_clean();
header('Content-Type: application/json');
echo json_encode($response);
?>
