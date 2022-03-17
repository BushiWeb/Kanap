import { ProductApiManager } from "../api/ProductApiManager";
import { ProductModel } from "./ProductModel";
import { MOCKED_API_DATA } from "../api/mockedApiData";
import { CONFIG_TEST } from "../config/mocked-configuration";

describe('ProductModel Unit Test Suite', () => {
    const productModel = new ProductModel(CONFIG_TEST);

    global.fetch = jest.fn();

    beforeEach(() => {
        global.fetch.mockReset();
    })


    describe('getAllProducts() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok : true
            });
            const data = await productModel.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if no data is received but the request is successful', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(null),
                ok : true
            });
            const data = await productModel.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await productModel.getAllProducts()
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await productModel.getAllProducts()
            }).rejects.toThrow();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok : true
            });
            const data = await productModel.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should throw an error if the status is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok : false,
                status : 404,
                statusText : 'Error'
            });
            await expect(async () => {
                await productModel.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await productModel.getProduct(MOCKED_API_DATA[0]._id);
            }).rejects.toThrow();
        });
    });
});