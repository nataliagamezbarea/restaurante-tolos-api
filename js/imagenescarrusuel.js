    document.addEventListener("DOMContentLoaded", async function () {
        const baseUrl = 'https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/galeria';

        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            const imageUrls = data.images.map(img => `https://restaurante-tolos-9b3l09cnp-nataliagamezbareas-projects.vercel.app/imagen?url=${encodeURIComponent(img)}`); 

            const gridContainer = document.getElementById('gridContainer');

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
            console.error('Error fetching images:', error);
        }
    });
