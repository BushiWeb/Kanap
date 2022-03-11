import { ProductApiManager } from "../api/ProductApiManager";
import { ProductModel } from "./ProductModel";
import { MOCKED_API_DATA } from "../api/mockedApiData";
import { CONFIG_TEST } from "../config/mocked-configuration";

describe('ProductModel Unit Test Suite', () => {
    describe('getAllProducts() Method Test Suite', () => {
        const apiManagerGetAllProductsMock = jest.spyOn(ProductApiManager.prototype, 'getAllProducts');

        it('should return all the data', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            const productModel = new ProductModel(CONFIG_TEST);
            const data = await productModel.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });


        it('should return an empty array if no data is available', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce([]);

            const productModel = new ProductModel(CONFIG_TEST);
            const data = await productModel.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        const apiManagerGetProductMock = jest.spyOn(ProductApiManager.prototype, 'getProduct');

        it('should return the data of the product', async () => {
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);

            const productModel = new ProductModel(CONFIG_TEST);
            const data = await productModel.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });
    });
});