import { RetryConfig } from '../config/retryConfig';

export async function retry<T>(fn: () => Promise<T>, config: RetryConfig): Promise<T> {
    const { retries, delay } = config;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === retries) {
                throw error; // Rethrow the error if max retries reached
            }
            await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        }
    }

    // Final attempt
    try {
        return await fn();
    } catch (error) {
        throw error;
    }
}