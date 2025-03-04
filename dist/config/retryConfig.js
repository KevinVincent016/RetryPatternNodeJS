"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.retries = exports.retryConfig = void 0;
exports.retryConfig = {
    retries: 5,
    delay: 1000,
    shouldRetry: (error) => {
        return error.response && error.response.status >= 500;
    }
};
exports.retries = 3;
exports.delay = 1000;
