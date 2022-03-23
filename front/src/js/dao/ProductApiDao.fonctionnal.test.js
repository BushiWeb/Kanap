/**
 * @jest-environment jsdom
 */

import { ProductApiDao } from "./ProductApiDao";
import { MOCKED_API_DATA } from "./mockedApiData";
import { CONFIG_TEST, TEST_URL } from "../config/mocked-configuration";
import { ConfigManager } from '../config/ConfigManager';


describe('ProductApiDao Unit Test Suite', () => {
    global.fetch = jest.fn().mockImplementation();
    const getApiUrlMock = jest.spyOn(ConfigManager.prototype, 'getApiUrl');
    getApiUrlMock.mockReturnValue(TEST_URL);
    const testApiDao = new ProductApiDao(CONFIG_TEST);

    beforeEach(() => {
        global.fetch.mockReset();
        getApiUrlMock.mockReset();
    })


    describe('sendRequest() Method Test Suite', () => {
        it('should call the fetch() function', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok : true
            });
            const data = await testApiDao.sendRequest();
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(testApiDao.apiUrl);
        });

        it('should call the fetch() function with the specified route', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok : true
            });
            const requestRoute = 'test';
            const fullRequestUrl = TEST_URL + requestRoute;

            const data = await testApiDao.sendRequest(requestRoute);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(fullRequestUrl);
        });

        it('should return the data from the API', async () => {
            const testData = {
                test: 'OK'
            }
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(testData),
                ok : true
            });
            const data = await testApiDao.sendRequest();
            expect(data).toEqual(testData);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await testApiDao.sendRequest()
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.sendRequest()
            }).rejects.toThrow();
        });
    })


    describe('getAllProducts() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok : true
            });
            const data = await testApiDao.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if no data is received but the request is successful', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(null),
                ok : true
            });
            const data = await testApiDao.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await testApiDao.getAllProducts()
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.getAllProducts()
            }).rejects.toThrow();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok : true
            });
            const data = await testApiDao.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await testApiDao.getProduct()
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.getProduct()
            }).rejects.toThrow();
        });
    });
})
