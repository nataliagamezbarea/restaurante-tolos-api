// Function to make HTTP request using fetch
async function fetchData(apiUrl) {
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Error en la solicitud HTTP: ' + response.status + ' ' + response.statusText);
    }

    return response.json();
}

// Function to handle the data for text content
function handleTextContent(data) {
    data.forEach((item, index) => {
        var currentTitle = item.title;
        var currentContent = item.content;

        var titleElement = document.getElementById("Titulo" + (index + 1));
        if (titleElement) {
            titleElement.textContent = currentTitle;
        }

        var contentDiv = document.getElementById("Contenido" + (index + 1));
        if (contentDiv) {
            contentDiv.innerHTML = currentContent;
        }
    });
}

// Function to handle the data for images
function handleImages(data) {
    data.forEach((section, index) => {
        var currentTitle = section.title;
        var currentImages = section.images;

        var titleElement = document.getElementById("Titulo" + (index + 1));
        if (titleElement) {
            titleElement.textContent = currentTitle;
        }

        var imagesDiv = document.getElementById("Imagenes" + (index + 1));
        if (imagesDiv) {
            currentImages.forEach(imageUrl => {
                var imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Imagen del Restaurante Tolo's";
                imgElement.classList.add("img-fluid");
                imagesDiv.appendChild(imgElement);
            });
        }

    });
}

// Main function using async/await
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const textData = await fetchData("obtener_datos.php");
        handleTextContent(textData);

        const imageData = await fetchData("obtener_imagenes.php");
        handleImages(imageData);
    } catch (error) {
        console.error(error);
    }
});
