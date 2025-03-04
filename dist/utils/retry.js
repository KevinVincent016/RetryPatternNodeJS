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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
function retry(fn, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { retries, delay } = config;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return yield fn();
            }
            catch (error) {
                if (attempt === retries) {
                    throw error; // Rethrow the error if max retries reached
                }
                yield new Promise(res => setTimeout(res, delay)); // Wait before retrying
            }
        }
        // Final attempt
        try {
            return yield fn();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.retry = retry;
