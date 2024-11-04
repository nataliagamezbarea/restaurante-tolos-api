async function fetchContent() {
    try {
        const response1 = await fetch('https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/concepto');
        if (!response1.ok) {
            throw new Error(`Network response was not ok for concepto: ${response1.statusText}`);
        }
        const data1 = await response1.json();
        document.getElementById('Titulo1').innerText = data1.titulo1;
        document.getElementById('Contenido1').innerText = data1.contenido1;
        const img1Url = data1.images[0];
        document.getElementById('Imagenes1').innerHTML = `<img src="https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/imagen?url=${encodeURIComponent(img1Url)}" alt="Imagen 1" class="img-fluid">`;

        const response2 = await fetch('https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/cartas');
        if (!response2.ok) {
            throw new Error(`Network response was not ok for cartas: ${response2.statusText}`);
        }
        const data2 = await response2.json();
        document.getElementById('Titulo2').innerText = data2.titulo2; 
        document.getElementById('Contenido2').innerText = data2.contenido2; 
        const img2Url = data2.images[0]; 
        document.getElementById('Imagenes2').innerHTML = `<img src="https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/imagen?url=${encodeURIComponent(img2Url)}" alt="Imagen 2" class="img-fluid">`;

        const response3 = await fetch('https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/ubicacion');
        if (!response3.ok) {
            throw new Error(`Network response was not ok for ubicacion: ${response3.statusText}`);
        }
        const data3 = await response3.json();
        document.getElementById('Titulo3').innerText = data3.titulo3; 
        document.getElementById('Contenido3').innerText = data3.contenido3; 
        const img3Url = data3.images[0]; 
        document.getElementById('Imagenes3').innerHTML = `<img src="https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/imagen?url=${encodeURIComponent(img3Url)}" alt="Imagen 3" class="img-fluid">`; 

    } catch (error) {
        console.error('Error fetching content:', error);
    }
}

document.addEventListener("DOMContentLoaded", fetchContent);