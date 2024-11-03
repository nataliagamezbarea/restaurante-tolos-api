document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = 'http://localhost:4282/';

    const imageUrls = [];
    for (let i = 1; i <= 15; i++) {
        imageUrls.push(`${baseUrl}wp-content/uploads/imagen${i}.png`);
    }

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
});
