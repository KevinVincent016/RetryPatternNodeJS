import express from 'express';
import path from 'path';
import { ApiService } from './services/apiService';
import { retryConfig } from './config/retryConfig';

const app = express();
const apiService = new ApiService();

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/visualizer.html'));
});

// Endpoint para la simulación
app.get('/fetch', async (req, res) => {
    try {
        const data = await apiService.fetchData();
        res.json({ success: true, data });
    } catch (error) {
        res.json({ 
            success: false, 
            error: error
        });
    }
});

// Endpoint para obtener la configuración
app.get('/config', (req, res) => {
    res.json(retryConfig);
});

// Endpoint para cambiar la URL base
app.post('/setApi', express.json(), (req, res) => {
    const { url } = req.body;
    apiService.setBaseUrl(url);
    res.json({ success: true, currentUrl: url });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the retry pattern visualizer`);
});