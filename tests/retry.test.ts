import { retry } from '../src/utils/retry';
import { ApiService } from '../src/services/apiService';
import { RetryConfig } from '../src/config/retryConfig';

describe('Retry Utility', () => {
    let apiService: ApiService;

    beforeEach(() => {
        apiService = new ApiService();
    });

    test('should retry the specified number of times on failure', async () => {
        const mockApiCall = jest.fn().mockRejectedValue(new Error('API call failed'));
        const config: RetryConfig = { retries: 3, delay: 100 };

        await expect(retry(mockApiCall, config)).rejects.toThrow('API call failed');
        expect(mockApiCall).toHaveBeenCalledTimes(3);
    });

    test('should succeed after a few retries', async () => {
        const mockApiCall = jest.fn()
            .mockRejectedValueOnce(new Error('API call failed'))
            .mockResolvedValue('API call succeeded');
        const config: RetryConfig = { retries: 3, delay: 100 };

        const result = await retry(mockApiCall, config);
        expect(result).toBe('API call succeeded');
        expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    test('should not retry if the condition is not met', async () => {
        const mockApiCall = jest.fn().mockRejectedValue(new Error('API call failed'));
        const config: RetryConfig = { retries: 0, delay: 100 };

        await expect(retry(mockApiCall, config)).rejects.toThrow('API call failed');
        expect(mockApiCall).toHaveBeenCalledTimes(1);
    });
});