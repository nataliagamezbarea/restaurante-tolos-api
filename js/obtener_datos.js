async function fetchPosts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error en la solicitud HTTP: " + response.status + " " + response.statusText);
        }
        const data = await response.json();
        if (!data.posts || !Array.isArray(data.posts) || data.posts.length === 0) {
            throw new Error("No se recibieron datos válidos desde la API");
        }
        return data.posts;
    } catch (error) {
        return { error: error.message };
    }
}

// Ordena los posts por el número al inicio del título (de menor a mayor)
function ordenarPosts(posts) {
    return posts.slice().sort((a, b) => {
        const numA = parseInt(a.title.match(/^\d+/));
        const numB = parseInt(b.title.match(/^\d+/));
        return (numA || 999) - (numB || 999); // Orden de menor a mayor
    });
}

function handleTextContent(posts) {
    let visibleIndex = 1;
    posts.forEach((post) => {
        const cleanTitle = post.title.replace(/^\d+-\s*/, '').trim().toLowerCase();

        // Si es Carrusuel, lo saltamos
        if (cleanTitle === "carrusuel") return;

        const titleElement = document.getElementById("Titulo" + visibleIndex);
        if (titleElement) {
            titleElement.textContent = post.title.replace(/^\d+-\s*/, '');
        }
        const contentDiv = document.getElementById("Contenido" + visibleIndex);
        if (contentDiv) {
            const cleanedContent = post.content.replace(/<figure[^>]*>.*?<img[^>]*>.*?<\/figure>/gs, '').replace(/<img[^>]*>/g, '');
            contentDiv.innerHTML = cleanedContent;
        }
        visibleIndex++;
    });
}

function handleImages(posts) {
    let visibleIndex = 1;
    posts.forEach((post) => {
        const cleanTitle = post.title.replace(/^\d+-\s*/, '').trim().toLowerCase();

        // Si es Carrusuel, lo saltamos
        if (cleanTitle === "carrusuel") return;

        const titleElement = document.getElementById("Titulo" + visibleIndex);
        if (titleElement) {
            titleElement.textContent = post.title.replace(/^\d+-\s*/, '');
        }

        const imagesDiv = document.getElementById("Imagenes" + visibleIndex);
        if (imagesDiv) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(post.content, 'text/html');
            const imgTags = Array.from(doc.getElementsByTagName('img'));
            imgTags.forEach(img => {
                const imgElement = document.createElement("img");
                imgElement.src = img.src;
                imgElement.alt = "Imagen del Restaurante Tolo's";
                imgElement.classList.add("img-fluid");
                imagesDiv.appendChild(imgElement);
            });
        }
        visibleIndex++;
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/nataliagamezbarea.wordpress.com/posts";

    try {
        const posts = await fetchPosts(apiUrl);
        if (Array.isArray(posts)) {
            const postsOrdenados = ordenarPosts(posts);
            handleTextContent(postsOrdenados);
            handleImages(postsOrdenados);
        } else if (posts.error) {
            console.error(posts.error);
        }
    } catch (error) {
        console.error(error);
    }
});