import { ProductApiDao } from "../dao/ProductApiDao";
import { ProductManagerKanapApi } from "./ProductManagerKanapApi";
import { MOCKED_API_DATA } from "../dao/mockedApiData";
import { MOCKED_PRODUCT_ENTITY_DATA } from "./mockedProductEntityData";
import { CONFIG_TEST } from "../config/mocked-configuration";
import { Product } from '../entity/Product';

describe('ProductManagerKanapApi Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi(CONFIG_TEST);


    describe('getAllProducts() Method Test Suite', () => {
        const apiDaoGetAllProductsMock = jest.spyOn(ProductApiDao.prototype, 'getAllProducts');
        const saveProductsMock = jest.spyOn(ProductManagerKanapApi.prototype, 'saveProducts');

        beforeEach(() => {
            apiDaoGetAllProductsMock.mockReset();
            saveProductsMock.mockReset();
        });

        it('should call the ProductApiDao.getAllProducts() method if not all the products are in the manager', async () => {
            apiDaoGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);
            productManager.productsListComplete = false;

            await productManager.getAllProducts();
            expect(apiDaoGetAllProductsMock).toHaveBeenCalled();
        });

        it('shouldn\'t call the ProductApiDao.getAllProducts() method if all the products are in the manager', async () => {
            productManager.productsListComplete = true;

            await productManager.getAllProducts();
            expect(apiDaoGetAllProductsMock).not.toHaveBeenCalled();
        });

        it('should return all the products if all the products are in the manager', async () => {
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

        it('should return all the products if not all the products are in the manager and the DAO returns all the products', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiDaoGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);
            saveProductsMock.mockImplementationOnce(() => {productManager.products = MOCKED_PRODUCT_ENTITY_DATA;})

            const data = await productManager.getAllProducts();
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA);
        });

        it('should update the stored product list if not all the products are in the manager and the DAO returns all the products', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiDaoGetAllProductsMock.mockResolvedValueOnce(MOCKED_API_DATA);

            await productManager.getAllProducts();
            expect(saveProductsMock).toHaveBeenCalled();
        });

        it('should return an empty array if not all the products are in the manager and the DAO returns no product', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiDaoGetAllProductsMock.mockResolvedValueOnce([]);
            saveProductsMock.mockImplementationOnce(() => {productManager.products = [];})

            const data = await productManager.getAllProducts();
            expect(data.length).toBe(0);
        });

        it('should update the stored product list if not all the products are in the manager and the DAO returns no product', async () => {
            productManager.productsListComplete = false;
            productManager.products = [];
            apiDaoGetAllProductsMock.mockResolvedValueOnce([]);

            await productManager.getAllProducts();
            expect(saveProductsMock).toHaveBeenCalled();
        });
    });


    describe('getProduct() Method Test Suite', () => {
        const apiManagerGetProductMock = jest.spyOn(ProductApiDao.prototype, 'getProduct');
        const checkProductMock = jest.spyOn(ProductManagerKanapApi.prototype, 'checkProduct');
        const saveProductsMock = jest.spyOn(ProductManagerKanapApi.prototype, 'saveProducts');

        beforeEach(() => {
            checkProductMock.mockReset();
            apiManagerGetProductMock.mockReset();
            saveProductsMock.mockReset();
        });

        afterAll(() => {
            saveProductsMock.mockRestore();
        })

        it('should call the ProductApiDao.getProduct() method with the product id as a parameter if the product isn\'t in the manager', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);
            saveProductsMock.mockReturnValue([0]);

            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(apiManagerGetProductMock).toHaveBeenCalled();
            expect(apiManagerGetProductMock).toHaveBeenCalledWith(MOCKED_API_DATA[0]._id);
        });

        it('should not call the ProductApiDao.getProduct() if the product is in the manager', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            productManager.productsListComplete = false;
            checkProductMock.mockReturnValueOnce(0);

            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(apiManagerGetProductMock).not.toHaveBeenCalled();
        });

        it('should not call the ProductApiDao.getProduct() if the product isn\'t in the manager but all the products are in the manager', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
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
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            productManager.productsListComplete = false;
            checkProductMock.mockReturnValueOnce(0);

            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
        });

        it('should throw an error if all the product\'s are in the manager, but the requested one doesn\'t exist', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            productManager.productsListComplete = true;
            checkProductMock.mockReturnValueOnce(false);

            await expect(async () => {
                await productManager.getProduct(MOCKED_API_DATA[0]);
            }).rejects.toThrow();
        });

        it('should return the product\'s data if the product is not in the manager', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);
            saveProductsMock.mockReturnValueOnce([0]);

            const data = await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(data).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
        });

        it('should add the product to the stored products', async () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            productManager.productsListComplete = false;
            apiManagerGetProductMock.mockResolvedValueOnce(MOCKED_API_DATA[0]);
            checkProductMock.mockReturnValueOnce(false);
            saveProductsMock.mockReturnValueOnce([0]);

            await productManager.getProduct(MOCKED_API_DATA[0]._id);
            expect(saveProductsMock).toHaveBeenCalled();
            expect(saveProductsMock).toHaveBeenCalledWith([MOCKED_API_DATA[0]]);
        });
    });


    describe('saveProducts() Method Test Suite', () => {
        const checkProductMock = jest.spyOn(ProductManagerKanapApi.prototype, 'checkProduct');

        beforeEach(() => {
            checkProductMock.mockReset();
        });

        afterAll(() => {
            checkProductMock.mockRestore();
        });

        it('should add the product list to the products property', () => {
            productManager.products = [];
            checkProductMock.mockReturnValue(false);
            productManager.saveProducts(MOCKED_API_DATA);
            expect(productManager.products.length).toBe(MOCKED_API_DATA.length);
        });

        it('should add the product list to the products property with the right data', () => {
            productManager.products = [];
            checkProductMock.mockReturnValue(false);
            productManager.saveProducts(MOCKED_API_DATA.slice(0, 1));
            for (let i = 0 ; i < productManager.products.length ; i++) {
                expect(productManager.products[0]._id).toBe(MOCKED_API_DATA[i]._id);
                expect(productManager.products[0]._name).toBe(MOCKED_API_DATA[i].name);
                expect(productManager.products[0]._price).toBe(MOCKED_API_DATA[i].price);
                expect(productManager.products[0]._description).toBe(MOCKED_API_DATA[i].description);
                expect(productManager.products[0]._imageSource).toBe(MOCKED_API_DATA[i].imageUrl);
                expect(productManager.products[0]._imageAltText).toBe(MOCKED_API_DATA[i].altTxt);
                expect(productManager.products[0]._colors).toEqual(MOCKED_API_DATA[i].colors);
            }
        });

        it('shouldn\'t change the products property if all the products are already saved', () => {
            const productsPushMock = jest.spyOn(productManager.products, 'push');
            productManager.products = [];
            checkProductMock.mockReturnValue(0);
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(0, 2);

            productManager.saveProducts(MOCKED_API_DATA.slice(0, 2));
            expect(productsPushMock).not.toHaveBeenCalled();
            productsPushMock.mockReset();
        });

        it('should replace the products property if the second argument is true', () => {
            productManager.products = [];
            checkProductMock.mockReturnValue(false);
            productManager.productsListComplete = false;
            const productTest = new Product('1', 'name1', 123, 'description', 'URL', 'texte', ['blue', 'black']);
            productManager.products.push(productTest);

            productManager.saveProducts(MOCKED_API_DATA, true);
            expect(productManager.products).not.toContainEqual(productTest);
            expect(productManager.productsListComplete).toBeTruthy();
        });

        it('should return an array containing the index of all the added products', () => {
            productManager.products = [];
            checkProductMock.mockReturnValue(false);
            const expectedResult = [];
            for (let i = 0 ; i < MOCKED_API_DATA.length ; i++) {
                expectedResult.push(i);
            }

            const indexList = productManager.saveProducts(MOCKED_API_DATA, true);
            expect(indexList).toEqual(expectedResult);
        });

        it('should return an array containing the index of all the added products if the products are already in the property', () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            checkProductMock.mockReturnValue(0);
            const expectedResult = [];
            for (let i = 0 ; i < MOCKED_API_DATA.length ; i++) {
                expectedResult.push(0);
            }

            const indexList = productManager.saveProducts(MOCKED_API_DATA, true);
            expect(indexList).toEqual(expectedResult);
        });
    });


    describe('checkProduct() Method Test Suite', () => {
        it('should return the index of the product in the array', () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA;
            const productIndex = productManager.checkProduct(MOCKED_API_DATA[0]._id);
            expect(productIndex).toBe(0);
        });

        it('should return false if the product is not in the array', () => {
            productManager.products = MOCKED_PRODUCT_ENTITY_DATA.slice(1);
            const productIndex = productManager.checkProduct(MOCKED_API_DATA[0]._id);
            expect(productIndex).toBe(false);
        });
    });
});