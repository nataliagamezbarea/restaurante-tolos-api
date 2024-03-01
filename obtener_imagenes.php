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

        if ($data && isset($data[0]["title"]["rendered"])) {
            // Acceder al valor dentro de "rendered" bajo la clave "title"
            $restaurant_title = $data[0]["title"]["rendered"];

            // Obtener el contenido del post y extraer las imágenes utilizando DOMDocument
            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML($data[0]['content']['rendered']);
            libxml_clear_errors();

            // Obtener o crear el elemento head
            $head = $doc->getElementsByTagName('head')->item(0);
            if (!$head) {
                $head = $doc->createElement('head');
                $doc->appendChild($head);
            }

            // Agregar la etiqueta base con la URL actual
            $base = $doc->createElement('base');
            $base->setAttribute('href', dirname($url));
            $head->appendChild($base);

            $images = $doc->getElementsByTagName('img');
            $restaurant_images = [];

            foreach ($images as $image) {
                $restaurant_images[] = $image->getAttribute('src');
            }

            // Agregar el resultado al array de resultados incluyendo las imágenes
            $result = array(
                'title' => $restaurant_title,
                'images' => $restaurant_images
            );

            // Agregar el resultado al array de resultados
            $results[] = $result;
        } else {
            $results[] = array('error' => 'No se pudo decodificar JSON o datos no válidos en la respuesta');
        }
    } else {
        $results[] = array('error' => 'Error en la solicitud cURL');
    }

    curl_close($curl);
}

// Devolver el resultado como JSON
echo json_encode($results);
?>
