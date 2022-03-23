import { ProductApiDao } from "../dao/ProductApiDao";
import { ProductManagerKanapApi } from "./ProductManagerKanapApi";
import { MOCKED_API_DATA } from "../dao/mockedApiData";
import { CONFIG_TEST } from "../config/mocked-configuration";

describe('ProductManagerKanapApi Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi(CONFIG_TEST);


    describe('getAllProducts() Method Test Suite', () => {
        const apiManagerGetAllProductsMock = jest.spyOn(ProductApiDao.prototype, 'getAllProducts');

        beforeEach(() => {
            apiManagerGetAllProductsMock.mockReset();
        });

        it('should call the ProductApiDao.getAllProducts() method if not all the products are in the manager', async () => {
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);
            productManager.productsListComplete = false;

            await productManager.getAllProducts();
            expect(apiManagerGetAllProductsMock).toHaveBeenCalled();
        });

        it('shouldn\'t call the ProductApiDao.getAllProducts() method if all the products are in the manager', async () => {
            productManager.productsListComplete = true;

            await productManager.getAllProducts();
            expect(apiManagerGetAllProductsMock).not.toHaveBeenCalled();
        });

        it('should return all the products if all the products are in the manager', async () => {
            productManager.productsListComplete = true;
            productManager.products = MOCKED_API_DATA;

            const data = await productManager.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should return an empty array if all the products are in the manager but there are no products', async () => {
            productManager.productsListComplete = true;
            productManager.products = [];

            const data = await productManager.getAllProducts();
            expect(data.length).toBe(0);
        });

        it('should return all the products if not all the products are in the manager and the DAO returns all the products', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            const data = await productManager.getAllProducts();
            expect(data).toEqual(MOCKED_API_DATA);
        });

        it('should update the stored product list if not all the products are in the manager and the DAO returns all the products', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiManagerGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            const data = await productManager.getAllProducts();
            expect(productManager.products).toEqual(MOCKED_API_DATA);
            expect(productManager.productsListComplete).toBeTruthy();
        });

        it('should return an empty array if not all the products are in the manager and the DAO returns no product', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiManagerGetAllProductsMock.mockResolvedValueOnce([]);

            const data = await productManager.getAllProducts();
            expect(data.length).toBe(0);
        });

        it('should update the stored product list if not all the products are in the manager and the DAO returns no product', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiManagerGetAllProductsMock.mockResolvedValueOnce([]);

            const data = await productManager.getAllProducts();
            expect(productManager.products).toEqual([]);
            expect(productManager.productsListComplete).toBeTruthy();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        const apiManagerGetProductMock = jest.spyOn(ProductApiDao.prototype, 'getProduct');
        const checkProductMock = jest.spyOn(productManager, 'checkProduct');

        beforeEach(() => {
            checkProductMock.mockReset();
            apiManagerGetProductMock.mockReset();
        });

        afterAll(() => {
            checkProductMock.mockRestore();
        })

        it('should call the ProductApiDao.getProduct() method with the product id as a parameter if the product isn\'t in the manager', async () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);

            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(apiManagerGetProductMock).toHaveBeenCalled();
            expect(apiManagerGetProductMock).toHaveBeenCalledWith(MOCKED_API_DATA[0]._id);
        });

        it('should not call the ProductApiDao.getProduct() if the product is in the manager', async () => {
            productManager.products = MOCKED_API_DATA;
            productManager.productsListComplete = false;
            checkProductMock.mockReturnValueOnce(0);

            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(apiManagerGetProductMock).not.toHaveBeenCalled();
        });

        it('should not call the ProductApiDao.getProduct() if the product isn\'t in the manager but all the products are in the manager', async () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            productManager.productsListComplete = true;
            checkProductMock.mockReturnValueOnce(false);

            try {
                await productManager.getProduct(MOCKED_API_DATA[0]._id);
            } catch (error) {

            } finally {
                expect(apiManagerGetProductMock).not.toHaveBeenCalled();
            }
        });

        it('should return the product\'s data if the data is in the manager', async () => {
            productManager.products = MOCKED_API_DATA;
            productManager.productsListComplete = false;
            checkProductMock.mockReturnValueOnce(0);

            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should throw an error if all the product\'s are in the manager, but the requested one doesn\'t exist', async () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            productManager.productsListComplete = true;
            checkProductMock.mockReturnValueOnce(false);

            await expect(async () => {
                await productManager.getProduct(MOCKED_API_DATA[0]);
            }).rejects.toThrow();
        });

        it('should return the product\'s data if the product is not in the manager', async () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);

            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_API_DATA[0]);
        });

        it('should add the product to the stored products', async () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);

            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(productManager.products).toContainEqual(MOCKED_API_DATA[0]);
        });
    });


    describe('checkProduct() Method Test Suite', () => {
        it('should return the index of the product in the array', () => {
            productManager.products = MOCKED_API_DATA;
            const productIndex = productManager.checkProduct(MOCKED_API_DATA[0]._id);
            expect(productIndex).toBe(0);
        });

        it('should return false if the product is not in the array', () => {
            productManager.products = MOCKED_API_DATA.slice(1);
            const productIndex = productManager.checkProduct(MOCKED_API_DATA[0]._id);
            expect(productIndex).toBe(false);
        });
    })
});