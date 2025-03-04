"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiService_1 = require("./services/apiService");
const retryConfig_1 = require("./config/retryConfig");
const app = (0, express_1.default)();
const apiService = new apiService_1.ApiService();
// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../templates/visualizer.html'));
});
// Endpoint para la simulación
app.get('/fetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield apiService.fetchData();
        res.json({ success: true, data });
    }
    catch (error) {
        res.json({
            success: false,
            error: error
        });
    }
}));
// Endpoint para obtener la configuración
app.get('/config', (req, res) => {
    res.json(retryConfig_1.retryConfig);
});
// Endpoint para cambiar la URL base
app.post('/setApi', express_1.default.json(), (req, res) => {
    const { url } = req.body;
    apiService.setBaseUrl(url);
    res.json({ success: true, currentUrl: url });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the retry pattern visualizer`);
});
