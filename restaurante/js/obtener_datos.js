async function fetchMultipleUrls(urls) {
    const results = [];

    for (let url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    const restaurantTitle = data[0].title.rendered;
                    const restaurantContent = data[0].content.rendered.replace(/<img[^>]*>/g, '');

                    results.push({
                        title: restaurantTitle,
                        content: restaurantContent
                    });
                } else {
                    results.push({ error: 'No se recibieron datos válidos desde ' + url });
                }
            } else {
                results.push({ error: 'Error en la solicitud HTTP: ' + response.status + ' ' + response.statusText });
            }
        } catch (error) {
            results.push({ error: 'Error en la solicitud HTTP a ' + url });
        }
    }

    return results;
}

function handleTextContent(data) {
    data.forEach((item, index) => {
        const currentTitle = item.title;
        const currentContent = item.content;

        const titleElement = document.getElementById("Titulo" + (index + 1));
        if (titleElement) {
            titleElement.textContent = currentTitle;
        }

        const contentDiv = document.getElementById("Contenido" + (index + 1));
        if (contentDiv) {
            contentDiv.innerHTML = currentContent;
        }
    });
}

async function fetchAndHandleImages(urls) {
    const imageResults = [];

    for (let url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0 && data[0].content.rendered) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data[0].content.rendered, 'text/html');

                    const images = Array.from(doc.getElementsByTagName('img')).map(image => image.src);
                    imageResults.push({
                        title: data[0].title.rendered,
                        images: images
                    });
                } else {
                    imageResults.push({ error: 'No se recibieron imágenes válidas desde ' + url });
                }
            } else {
                imageResults.push({ error: 'Error en la solicitud HTTP: ' + response.status + ' ' + response.statusText });
            }
        } catch (error) {
            imageResults.push({ error: 'Error en la solicitud HTTP a ' + url });
        }
    }

    return imageResults;
}

function handleImages(data) {
    data.forEach((section, index) => {
        const currentTitle = section.title;
        const currentImages = section.images;

        const titleElement = document.getElementById("Titulo" + (index + 1));
        if (titleElement) {
            titleElement.textContent = currentTitle;
        }

        const imagesDiv = document.getElementById("Imagenes" + (index + 1));
        if (imagesDiv) {
            currentImages.forEach(imageUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Imagen del Restaurante Tolo's";
                imgElement.classList.add("img-fluid");
                imagesDiv.appendChild(imgElement);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const urls = [
        "http://localhost:4282/wp-json/wp/v2/pages?slug=apartado-1",
        "http://localhost:4282/wp-json/wp/v2/pages?slug=apartado-2",
        "http://localhost:4282/wp-json/wp/v2/pages?slug=apartado-3",
    ];

    try {
        const textData = await fetchMultipleUrls(urls);
        handleTextContent(textData);

        const imageData = await fetchAndHandleImages(urls);
        handleImages(imageData);
    } catch (error) {
        console.error(error);
    }
});
