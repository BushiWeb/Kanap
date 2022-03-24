import { Cart } from "./Cart";
import { CartProduct } from "./CartProduct";
import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('Cart Unit Test Suite', () => {

    describe('Constructor Test Suite', () => {
        it('should create an instance of Cart with the right products', () => {
            const testProducts = [{
                _id: MOCKED_API_DATA[0]._id,
                color: MOCKED_API_DATA[0].colors[0],
                quantity: 4
                },
                {
                _id: MOCKED_API_DATA[1]._id,
                color: MOCKED_API_DATA[1].colors[0],
                quantity: 4
            }]

            const cartProductEntity = new Cart(testProducts);

            for (let i = 0 ; i < testProducts.length ; i++) {
                expect(cartProductEntity._products).toContainEqual(new CartProduct(testProducts[i]._id, testProducts[i].color, testProducts[i].quantity));
            }
        });

        it('should create an instance of Cart without any product', () => {
            const cartEntity = new Cart();
            expect(cartEntity._products.length).toBe(0);
        });
    });


    describe('Getters Test Suite', () => {
        const testProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        }
        const cartEntity = new Cart([new CartProduct(testProduct._id, testProduct.color, testProduct.quantity)]);

        it('should return the value of Cart._products', () => {
            expect(cartEntity.products).toBe(cartEntity._products);
        });
    });


    describe('Setters Test Suite', () => {
        const testProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        }
        const cartEntity = new Cart();

        it('should set the value of Cart._products', () => {
            const newProducts = [new CartProduct(testProduct._id, testProduct.color, testProduct.quantity)]
            cartEntity.products = newProducts;
            expect(cartEntity._products).toBe(newProducts);
        });
    });


    describe('addProduct() Test Suite', () => {
        const testQuantity = 4;
        const rawTestProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: testQuantity
        }
        const cartEntity = new Cart();

        const searchProductMock = jest.spyOn(Cart.prototype, 'searchProduct');

        beforeEach(() => {
            searchProductMock.mockReset();
        });

        afterAll(() => {
            searchProductMock.mockRestore();
        });

        it('should change the product\'s quantity if it is already in the cart', () => {
            searchProductMock.mockReturnValue(0);
            const testProduct = new CartProduct(rawTestProduct._id, rawTestProduct.color, rawTestProduct.quantity);
            cartEntity._products = [testProduct];
            cartEntity.addProduct(rawTestProduct);
            expect(cartEntity._products[0].quantity).toBe(2 * testQuantity);
        });

        it('should add the product to the cart', () => {
            searchProductMock.mockReturnValue(false);
            cartEntity._products = [];
            const testProduct = new CartProduct(rawTestProduct._id, rawTestProduct.color, rawTestProduct.quantity);
            cartEntity.addProduct(rawTestProduct);
            expect(cartEntity._products[0]).toEqual(testProduct);
        });
    });


    describe('searchProduct() Test Suite', () => {
        const testProductToSearch = new CartProduct(MOCKED_API_DATA[0]._id, MOCKED_API_DATA[0].colors[0], 4);
        const testProductToPopulate = new CartProduct(MOCKED_API_DATA[1]._id, MOCKED_API_DATA[1].colors[0], 4);
        const cartEntity = new Cart();

        it('should return the index of the product', () => {
            cartEntity._products = [testProductToPopulate, testProductToSearch];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(1);
        });

        it('should return false if the product is not in the cart', () => {
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same ID', () => {
            testProductToPopulate._color = MOCKED_API_DATA[1].colors[0];
            testProductToPopulate._id = testProductToSearch.id;
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same color', () => {
            testProductToPopulate._color = testProductToSearch.color;
            testProductToPopulate._id = MOCKED_API_DATA[1]._id;
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });
    });
});