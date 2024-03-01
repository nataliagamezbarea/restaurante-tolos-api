<?php
header("Access-Control-Allow-Origin: *");

$urls = [
    "https://wordpress.nataliagamezbarea.com/tolos/wp-json/wp/v2/pages?slug=apartado-1",
    "https://wordpress.nataliagamezbarea.com/tolos/wp-json/wp/v2/pages?slug=apartado-2",
    "https://wordpress.nataliagamezbarea.com/tolos/wp-json/wp/v2/pages?slug=apartado-3",
];

$results = [];

foreach ($urls as $url) {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);

    if ($response !== false) {
        $data = json_decode($response, true);

        // Verificar si hay datos en el array
        if (is_array($data) && count($data) > 0) {
            // Acceder al valor dentro de "rendered" bajo la clave "title"
            $restaurant_title = $data[0]["title"]["rendered"];

            // Obtener el contenido del post y filtrar las imágenes
            $restaurant_content = preg_replace('/<img[^>]+>/', '', $data[0]['content']['rendered']);

            // Crear un array con la información
            $result = array(
                'title' => $restaurant_title,
                'content' => $restaurant_content
            );

            // Agregar el resultado al array de resultados
            $results[] = $result;
        } else {
            $results[] = array('error' => 'No se recibieron datos válidos desde ' . $url);
        }
    } else {
        $results[] = array('error' => 'Error en la solicitud HTTP a ' . $url);
    }

    curl_close($curl);
}

// Devolver el resultado como JSON
echo json_encode($results);
