<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tu Título</title>
    <!-- Incluir SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>

<?php
// Conexión a la base de datos
$servername = "localhost";;
$username = "u297165060_Administrador";
$password = "Kikolandia17";
$dbname = "u297165060_tolos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $mensaje = $_POST['mensaje'];

    // Insertar datos en la base de datos
    $sql = "INSERT INTO reservas (nombre, correo, mensaje) VALUES ('$nombre', '$correo', '$mensaje')";

    if ($conn->query($sql) === TRUE) {
        // Datos guardados correctamente
        echo '<script>
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Datos guardados correctamente",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "../Vilacuisines.html";
                    }
                });
              </script>';
    } else {
        // Error al guardar los datos
        echo '<script>
                swal("¡Error!", "Error al guardar los datos: ' . $conn->error . '", "error");
              </script>';
    }
}

// Cerrar la conexión
$conn->close();
?>
</body>
</html>
