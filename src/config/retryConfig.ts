export interface RetryConfig {
    retries: number;
    delay: number;
    shouldRetry?: (error: any) => boolean;
}

export const retryConfig: RetryConfig = {
    retries: 5,
    delay: 1000,
    shouldRetry: (error) => {
        return error.response && error.response.status >= 500;
    }
};

export const retries = 3;
export const delay = 1000;