/**
 * @jest-environment jsdom
 */

import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { CONFIG_TEST, TEST_URL } from '../data/mocked-configuration';
import { ConfigManager } from '../../js/config/ConfigManager';

describe('ProductApiDao Functionnal Test Suite', () => {
    global.fetch = jest.fn().mockImplementation();
    const getApiUrlMock = jest.spyOn(ConfigManager.prototype, 'getApiUrl');
    getApiUrlMock.mockReturnValue(TEST_URL);
    const testApiDao = new ProductApiDao(CONFIG_TEST);

    beforeEach(() => {
        global.fetch.mockReset();
        getApiUrlMock.mockReset();
    });

    describe('getAllProducts() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });
            const data = await testApiDao.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if no data is received but the request is successful', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(null),
                ok: true,
            });
            const data = await testApiDao.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Error',
            });
            await expect(async () => {
                await testApiDao.getAllProducts();
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.getAllProducts();
            }).rejects.toThrow();
        });
    });

    describe('getProduct() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok: true,
            });
            const data = await testApiDao.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Error',
            });
            await expect(async () => {
                await testApiDao.getProduct();
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await testApiDao.getProduct();
            }).rejects.toThrow();
        });
    });

    describe('sendOrder() Method Test Suite', () => {
        const orderData = {
            contact: {
                firstName: 'Flam',
                lastName: 'Captain',
                address: 'Moon',
                city: 'Space',
                email: 'captainflam@hero.gal',
            },
            products: [MOCKED_API_DATA[0]._id, MOCKED_API_DATA[1]._id],
        };
        const returnedOrderData = {
            contact: orderData.contact,
            products: [MOCKED_PRODUCT_ENTITY_DATA[0], MOCKED_PRODUCT_ENTITY_DATA[1]],
            orderId: '123',
        };

        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(returnedOrderData),
                ok: true,
            });
            const data = await testApiDao.sendOrder(orderData);
            expect(data).toEqual(returnedOrderData);
        });

        it('should throw an error if the status is 400', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Error',
            });
            await expect(async () => {
                await testApiDao.sendOrder(orderData);
            }).rejects.toThrow();
        });

        it('should throw an error if the status is 500', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Error',
            });
            await expect(async () => {
                await testApiDao.sendOrder(orderData);
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValueOnce(error);
            await expect(async () => {
                await testApiDao.sendOrder(orderData);
            }).rejects.toThrow();
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
