import { ProductApiManager } from "../api/ProductApiManager";
import { ProductModel } from "./ProductModel";
import { MOCKED_API_DATA } from "../api/mockedApiData";
import { CONFIG_TEST } from "../config/mocked-configuration";

describe('ProductModel Unit Test Suite', () => {
    const productModel = new ProductModel(CONFIG_TEST);


    describe('getAllProducts() Method Test Suite', () => {
        const apiManagerGetAllProductsMock = jest.spyOn(ProductApiManager.prototype, 'getAllProducts');

        beforeEach(() => {
            apiManagerGetAllProductsMock.mockReset();
        });

        it('should call the ProductApiManager.getAllProducts() method', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            await productModel.getAllProducts();
            expect(apiManagerGetAllProductsMock).toHaveBeenCalled();
        });

        it('should return all the products', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            const data = await productModel.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if no data is available', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce([]);

            const data = await productModel.getAllProducts();
            expect(Array.isArray(data)).toBeTruthy();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        const apiManagerGetProductMock = jest.spyOn(ProductApiManager.prototype, 'getProduct');

        it('should call the ProductApiManager.getProduct() method with the product id as a parameter', async () => {
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);

            await productModel.getProduct(MOCKED_API_DATA[0]._id);
            expect(apiManagerGetProductMock).toHaveBeenCalled();
            expect(apiManagerGetProductMock).toHaveBeenCalledWith(MOCKED_API_DATA[0]._id);
        });

        it('should return the product\'s data', async () => {
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);

            const data = await productModel.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });
    });
});