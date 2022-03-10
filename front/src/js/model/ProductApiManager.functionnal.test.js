/**
 * @jest-environment jsdom
 */

import { ProductApiManager } from "./ProductApiManager";
import { MOCKED_API_DATA } from "./mockedApiData";
import { CONFIG_TEST, TEST_URL } from "../config/mocked-configuration";

let testApiManager = new ProductApiManager(CONFIG_TEST);

describe('ProductApiManager Constructor Test Suite', () => {
    it('should contain the right API URL', () => {
        expect(testApiManager.apiUrl).toBe(TEST_URL);
    });
});




describe('ProductApiManager.getAllProducts() Method Functionnal Test Suite', () => {
    global.fetch = jest.fn().mockImplementation();
    const consoleMock = jest.spyOn(global.console, 'error');

    beforeEach(() => {
        global.fetch.mockReset();
        consoleMock.mockReset();
    })

    it('should call the fetch() function', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(['test']),
            ok : true
        });
        const data = await testApiManager.getAllProducts();
        expect(global.fetch).toHaveBeenCalled();
    });

    it('should return the data from the API', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(MOCKED_API_DATA),
            ok : true
        });
        const data = await testApiManager.getAllProducts();
        expect(data).toEqual(MOCKED_API_DATA);
    });

    it('should return an empty array if no data is received but the request is successful', async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(null),
            ok : true
        });
        const data = await testApiManager.getAllProducts();
        expect(Array.isArray(data)).toBeTruthy();
    });

    it('should print an error on the console if the status is not ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok : false,
            status : 404,
            statusText : 'Error'
        });
        await testApiManager.getAllProducts();
        expect(consoleMock).toHaveBeenCalled();
    });

    it('should print an error on the console if the request fails', async () => {
        const error = new Error('Error while fetching');
        global.fetch.mockRejectedValue(error);
        await testApiManager.getAllProducts();
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenCalledWith(error);
    });
});