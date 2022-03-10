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
});