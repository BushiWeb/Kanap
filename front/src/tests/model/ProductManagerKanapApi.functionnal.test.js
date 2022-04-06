import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { ProductManagerKanapApi } from '../../js/model/ProductManagerKanapApi';
import { MOCKED_API_DATA } from '../../js/dao/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { CONFIG_TEST } from '../data/mocked-configuration';

describe('ProductManagerKanapApi Functionnal Test Suite', () => {
    const productManager = new ProductManagerKanapApi(CONFIG_TEST);

    global.fetch = jest.fn();

    beforeEach(() => {
        global.fetch.mockReset();
    });

    describe('getAllProducts() Method Test Suite', () => {
        it('should return the data if all the products are in the manager', async () => {
            productManager.productsListComplete = true;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            const data = await productManager.getAllProducts();
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA);
        });

        it('should return an empty array if all the products are in the manager but there are no products', async () => {
            productManager.productsListComplete = true;
            productManager.products = [];
            const data = await productManager.getAllProducts();
            expect(data.length).toBe(0);
        });

        it('should return the data from the API if not all the products are in the manager', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });
            const data = await productManager.getAllProducts();
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA);
        });

        it('should update the products property if not all the products are in the manager', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });
            const data = await productManager.getAllProducts();
            expect(productManager.products).toEqual(MOCKED_PRODUCT_ENTITY_DATA);
            expect(productManager.productsListComplete).toBeTruthy();
        });

        it('should return an empty array if no data is received but the request is successful', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(null),
                ok: true,
            });
            const data = await productManager.getAllProducts();
            expect(data.length).toBe(0);
        });

        it('should update the products property if no data is received but the request is successful', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(null),
                ok: true,
            });
            const data = await productManager.getAllProducts();
            expect(productManager.products).toEqual([]);
            expect(productManager.productsListComplete).toBeTruthy();
        });

        it('should throw an error if the status is not ok', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Error',
            });
            await expect(async () => {
                await productManager.getAllProducts();
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await productManager.getAllProducts();
            }).rejects.toThrow();
        });
    });

    describe('getProduct() Method Test Suite', () => {
        it('should return the data if the product is in the manager', async () => {
            productManager.productsListComplete = false;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
        });

        it('should throw an error if all the products are in the manager but the requested product is not', async () => {
            productManager.productsListComplete = true;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            await expect(async () => {
                await productManager.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });

        it('should return the data from the API if the product is not in the manager', async () => {
            productManager.productsListComplete = false;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok: true,
            });
            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
        });

        it('should update the products property if the product is not in the manager', async () => {
            productManager.productsListComplete = false;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok: true,
            });
            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(productManager.products).toContainEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
        });

        it('should throw an error if the status is not ok', async () => {
            productManager.productsListComplete = false;
            productManager.products = MOCKED_API_DATA.slice(1);
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Error',
            });
            await expect(async () => {
                await productManager.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            productManager.productsListComplete = false;
            productManager.products = MOCKED_API_DATA.slice(1);
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await productManager.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });
    });

    describe('getProductsList() Method Test Suite', () => {
        const idsList = [MOCKED_PRODUCT_ENTITY_DATA[0].id, MOCKED_PRODUCT_ENTITY_DATA[1].id];

        it('should return an array of products entities', async () => {
            productManager.productsListComplete = true;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            const productsList = await productManager.getProductsList(idsList);
            expect(productsList[0]).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
            expect(productsList[1]).toEqual(MOCKED_PRODUCT_ENTITY_DATA[1]);
        });

        it('should return an array of products entities and error messages', async () => {
            productManager.productsListComplete = true;
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            const errorIdsList = [...idsList, '2'];
            const productsList = await productManager.getProductsList(errorIdsList);
            expect(productsList[0]).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
            expect(productsList[1]).toEqual(MOCKED_PRODUCT_ENTITY_DATA[1]);
            expect(typeof productsList[2]).toEqual('string');
        });
    });
});
