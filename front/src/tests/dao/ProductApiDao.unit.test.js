/**
 * @jest-environment jsdom
 */

import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { CONFIG_TEST, TEST_URL } from '../data/mocked-configuration';
import { ConfigManager } from '../../js/config/ConfigManager';
import { MOCKED_ORDER_DATA, MOCKED_ORDER_DATA_RETURNED } from '../data/mockedOrderData';

describe('ProductApiDao Unit Test Suite', () => {
    global.fetch = jest.fn().mockImplementation();
    const getApiUrlMock = jest.spyOn(ConfigManager.prototype, 'getApiUrl');
    getApiUrlMock.mockReturnValue(TEST_URL);
    const testApiDao = new ProductApiDao(CONFIG_TEST);

    beforeEach(() => {
        global.fetch.mockReset();
        getApiUrlMock.mockReset();
    });

    describe('Constructor Test Suite', () => {
        it('should contain the right API URL', () => {
            expect(testApiDao.apiUrl).toBe(TEST_URL);
        });
    });

    describe('sendRequest() Method Test Suite', () => {
        it('should call the fetch() function', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok: true,
            });
            const data = await testApiDao.sendRequest();
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(testApiDao.apiUrl);
        });

        it('should call the fetch() function with the specified route', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok: true,
            });
            const requestRoute = 'test';
            const fullRequestUrl = TEST_URL + requestRoute;

            const data = await testApiDao.sendRequest(requestRoute);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith(fullRequestUrl);
        });

        it('should call the fetch() function with the data if we use the post method', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(['test']),
                ok: true,
            });
            const requestRoute = 'test';
            const fullRequestUrl = TEST_URL + requestRoute;
            const sentData = {
                id: 'id',
                name: 'name',
            };
            const fetchPostParameter = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sentData),
            };

            const data = await testApiDao.sendRequest(requestRoute, true, sentData);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch.mock.calls[0][0]).toEqual(fullRequestUrl);
            expect(global.fetch.mock.calls[0][1]).toEqual(fetchPostParameter);
        });

        it('should return the data from the API', async () => {
            const testData = {
                test: 'OK',
            };
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(testData),
                ok: true,
            });
            const data = await testApiDao.sendRequest();
            expect(data).toEqual(testData);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Error',
            });
            await expect(async () => {
                await testApiDao.sendRequest();
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.sendRequest();
            }).rejects.toThrow();
        });
    });

    describe('getAllProducts() Method Test Suite', () => {
        const sendRequestMock = jest.spyOn(testApiDao, 'sendRequest');

        beforeEach(() => {
            sendRequestMock.mockReset();
        });

        it('should call the ProductApiDao.sendRequest() method', async () => {
            sendRequestMock.mockReturnValue({
                data: 'test',
            });
            await testApiDao.getAllProducts();
            expect(sendRequestMock).toHaveBeenCalled();
        });

        it('should return the data from the API', async () => {
            sendRequestMock.mockReturnValue(MOCKED_API_DATA);
            const data = await testApiDao.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if no data is received but the request is successful', async () => {
            global.fetch.mockReturnValue(null);
            const data = await testApiDao.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });
    });

    describe('getProduct() Method Test Suite', () => {
        const sendRequestMock = jest.spyOn(testApiDao, 'sendRequest');

        beforeEach(() => {
            sendRequestMock.mockReset();
        });

        it("should call the ProductApiDao.sendRequest() method with the product's ID", async () => {
            sendRequestMock.mockReturnValue({
                data: 'test',
            });
            await testApiDao.getProduct(MOCKED_API_DATA[0]._id);
            expect(sendRequestMock).toHaveBeenCalled();
            expect(sendRequestMock).toHaveBeenCalledWith(MOCKED_API_DATA[0]._id);
        });

        it('should return the data from the API', async () => {
            sendRequestMock.mockReturnValue(MOCKED_API_DATA[0]);
            const data = await testApiDao.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });
    });

    describe('sendOrder() Method Test Suite', () => {
        const sendRequestMock = jest.spyOn(testApiDao, 'sendRequest');
        const orderData = MOCKED_ORDER_DATA();
        const returnedOrderData = MOCKED_ORDER_DATA_RETURNED();

        beforeEach(() => {
            sendRequestMock.mockReset();
        });

        it("should call the ProductApiDao.sendRequest() method with the order's data", async () => {
            sendRequestMock.mockReturnValue({
                data: 'test',
            });
            await testApiDao.sendOrder(orderData);
            expect(sendRequestMock).toHaveBeenCalled();
            expect(sendRequestMock).toHaveBeenCalledWith('order', true, orderData);
        });

        it('should return the data from the API', async () => {
            sendRequestMock.mockReturnValue(returnedOrderData);
            const data = await testApiDao.sendOrder(orderData);
            expect(data).toEqual(returnedOrderData);
        });

        it("should throw an error if the data don't have the right format", async () => {
            let badData = JSON.parse(JSON.stringify(orderData));
            delete badData.contact;
            await expect(async () => {
                await testApiDao.sendOrder(badData);
            }).rejects.toThrow();
        });
    });
});
