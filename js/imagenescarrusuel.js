document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/nataliagamezbarea.wordpress.com/posts';
    const gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) return;

    // Helper para extraer URLs de <img src="...">
    function extractImageUrlsFromContent(html) {
        const regex = /<img[^>]+src="([^">]+)"/g;
        let urls = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
            urls.push(match[1]);
        }
        return urls;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Encuentra el post "Carrusuel"
        const carrusuelPost = data.posts.find(post => post.title.toLowerCase().includes('carrusuel'));
        if (!carrusuelPost) return;

        // Extrae las URLs de las imágenes del contenido HTML del post
        const imageUrls = extractImageUrlsFromContent(carrusuelPost.content);

        // Renderiza el grid con las imágenes
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            if (index === 0) {
                div.classList.add('tall');
            } else if (index === 2) {
                div.classList.add('wide');
            } else if (index === 8) {
                div.classList.add('tall', 'wide');
            }
            div.style.backgroundImage = `url('${url}')`;
            gridContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching carrusuel images:', error);
    }
});