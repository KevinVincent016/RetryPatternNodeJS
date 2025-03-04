"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
class ApiService {
    constructor() {
        this.baseUrl = 'https://api.example.com'; // Replace with your API endpoint
    }
    setBaseUrl(url) {
        this.baseUrl = url;
    }
    fetchData(endpoint = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.retry(() => this.makeRequest(endpoint));
            return response;
        });
    }
    makeRequest(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        });
    }
    retry(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { retries, delay } = yield Promise.resolve().then(() => __importStar(require('../config/retryConfig')));
            let attempts = 0;
            while (attempts < retries) {
                try {
                    return yield fn();
                }
                catch (error) {
                    attempts++;
                    if (attempts >= retries) {
                        throw error;
                    }
                    yield this.delay(delay);
                }
            }
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.ApiService = ApiService;
