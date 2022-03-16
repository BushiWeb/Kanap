/**
 * @jest-environment jsdom
 */

import { ProductApiManager } from "./ProductApiManager";
import { MOCKED_API_DATA } from "./mockedApiData";
import { CONFIG_TEST, TEST_URL } from "../config/mocked-configuration";
import { ConfigManager } from '../config/ConfigManager';


describe('ProductApiManager Unit Test Suite', () => {
    global.fetch = jest.fn().mockImplementation();
    const getApiUrlMock = jest.spyOn(ConfigManager.prototype, 'getApiUrl');
    getApiUrlMock.mockReturnValue(TEST_URL);
    const testApiManager = new ProductApiManager(CONFIG_TEST);

    beforeEach(() => {
        global.fetch.mockReset();
        getApiUrlMock.mockReset();
    })


    describe('Constructor Test Suite', () => {
        it('should contain the right API URL', () => {
            expect(testApiManager.apiUrl).toBe(TEST_URL);
        });
    });


    describe('getAllProducts() Method Test Suite', () => {
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

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await testApiManager.getAllProducts()
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiManager.getAllProducts()
            }).rejects.toThrow();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        it('should call the fetch() function with the completed URL', async () => {
            const completedUrl = TEST_URL + MOCKED_API_DATA[0]._id;
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok : true
            });
            const data = await testApiManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(completedUrl);
        });

        it('should call the fetch() function with the completed URL if the apiUrl does\'t contain a slash at the end', async () => {
            testApiManager.apiUrl = testApiManager.apiUrl.substring(0, testApiManager.apiUrl.length - 1);
            const completedUrl = TEST_URL + MOCKED_API_DATA[0]._id;
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok : true
            });
            const data = await testApiManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(completedUrl);
        });

        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok : true
            });
            const data = await testApiManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await testApiManager.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiManager.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });
    });
})
