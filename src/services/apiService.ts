export class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.example.com'; // Replace with your API endpoint
    }

    public setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    public async fetchData(endpoint: string = ''): Promise<any> {
        const response = await this.retry(() => this.makeRequest(endpoint));
        return response;
    }

    private async makeRequest(endpoint: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    }

    private async retry(fn: () => Promise<any>): Promise<any> {
        const { retries, delay } = await import('../config/retryConfig');
        let attempts = 0;

        while (attempts < retries) {
            try {
                return await fn();
            } catch (error) {
                attempts++;
                if (attempts >= retries) {
                    throw error;
                }
                await this.delay(delay);
            }
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}