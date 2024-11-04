const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 4000;
const url = "https://vilacuisines.com/wp-json/wp/v2/pages?slug=tolos";

// Middleware for CORS
app.use(cors({
    origin: '*', // Allows requests from any origin
}));

// Function to fetch content from the external API
const fetchContent = async () => {
    try {
        const response = await axios.get(url);
        return response.data.length > 0 ? response.data[0].content.rendered : null;
    } catch (error) {
        console.error('Error fetching content:', error);
        return null;
    }
};

// Function to extract data from a specific section of HTML
const extractSectionData = (html, sectionId) => {
    const $ = cheerio.load(html);
    const section = $(`#${sectionId}`);
    if (!section.length) return null;

    const title = section.find('h2').first().text().trim();
    const paragraph = section.find('p').map((_, p) => $(p).text()).get().join(' ').trim();
    const images = section.find('.fusion-imageframe img').map((_, img) => $(img).attr('src')).get();
    const backgroundImages = section.find('.fusion-column-wrapper').map((_, colDiv) => $(colDiv).data('bg-url')).get();

    return {
        title,
        paragraph,
        images: [...images, ...backgroundImages],
    };
};

// Route to get 'concepto' section data
app.get('/concepto', async (req, res) => {
    const content = await fetchContent();
    if (content) {
        const data = extractSectionData(content, 'concepto');
        if (data) {
            res.json({ titulo1: data.title, contenido1: data.paragraph, images: data.images });
        } else {
            res.status(404).json({ error: 'Section "concepto" not found.' });
        }
    } else {
        res.status(404).json({ error: 'Content not found.' });
    }
});

// Route to get 'cartas' section data
app.get('/cartas', async (req, res) => {
    const content = await fetchContent();
    if (content) {
        const data = extractSectionData(content, 'cartas');
        if (data) {
            res.json({ titulo2: data.title, contenido2: data.paragraph, images: data.images });
        } else {
            res.status(404).json({ error: 'Section "cartas" not found.' });
        }
    } else {
        res.status(404).json({ error: 'Content not found.' });
    }
});

// Route to get 'ubicacion' section data
app.get('/ubicacion', async (req, res) => {
    const content = await fetchContent();
    if (content) {
        const data = extractSectionData(content, 'ubicacion');
        if (data) {
            res.json({ titulo3: data.title, contenido3: data.paragraph, images: data.images });
        } else {
            res.status(404).json({ error: 'Section "ubicacion" not found.' });
        }
    } else {
        res.status(404).json({ error: 'Content not found.' });
    }
});

// Route to get gallery images
app.get('/galeria', async (req, res) => {
    const content = await fetchContent();
    if (content) {
        const $ = cheerio.load(content);
        const gallerySection = $('#galeria');
        const galleryImages = gallerySection.find('.fusion-gallery-image a').map((_, a) => $(a).attr('href')).get();
        const backgroundImages = gallerySection.find('.fusion-gallery-image div')
            .filter((_, div) => $(div).attr('style')?.includes('background-image'))
            .map((_, div) => {
                const style = $(div).attr('style');
                return style.split('url(')[1].split(')')[0].replace(/['"]/g, '');
            }).get();

        res.json({ images: [...galleryImages, ...backgroundImages] });
    } else {
        res.status(404).json({ error: 'Gallery content not found.' });
    }
});

// Image proxy endpoint
app.get('/imagen', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required.' });
    }

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Could not fetch image.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
