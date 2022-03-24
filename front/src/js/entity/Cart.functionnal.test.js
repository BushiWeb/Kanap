import { Cart } from "./Cart";
import { CartProduct } from "./CartProduct";
import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('Cart Unit Test Suite', () => {
    const testProducts = [
        {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        },
        {
            _id: MOCKED_API_DATA[1]._id,
            color: MOCKED_API_DATA[1].colors[0],
            quantity: 4
        }
    ];

    describe('Constructor Test Suite', () => {
        it('should create an instance of Cart with the right products', () => {
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


    describe('Setters Test Suite', () => {
        const cartEntity = new Cart();

        it('should set the value of Cart._products', () => {
            const newProducts = [new CartProduct(testProducts[0]._id, testProducts[0].color, testProducts[0].quantity)]
            cartEntity.products = [testProducts[0]];
            expect(cartEntity._products).toEqual(newProducts);
        });
    });


    describe('addProduct() Test Suite', () => {
        const cartEntity = new Cart();

        it('should change the product\'s quantity if it is already in the cart', () => {
            const testProductEntity = new CartProduct(testProducts[0]._id, testProducts[0].color, testProducts[0].quantity);
            cartEntity._products = [testProductEntity];
            cartEntity.addProduct(testProducts[0]);
            expect(cartEntity._products[0].quantity).toBe(2 * testProducts[0].quantity);
        });

        it('should add the product to the cart', () => {
            cartEntity._products = [];
            const testProductEntity = new CartProduct(testProducts[0]._id, testProducts[0].color, testProducts[0].quantity);
            cartEntity.addProduct(testProducts[0]);
            expect(cartEntity._products[0]).toEqual(testProductEntity);
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