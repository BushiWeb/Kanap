import { Cart } from "./Cart";
import { CartProduct } from "./CartProduct";
import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('Cart Functionnal Test Suite', () => {
    const testProducts = [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        },
        {
            id: MOCKED_API_DATA[1]._id,
            color: MOCKED_API_DATA[1].colors[0],
            quantity: 4
        }
    ];

    describe('Constructor Test Suite', () => {
        it('should create an instance of Cart with the right products', () => {
            const cartProductEntity = new Cart(testProducts);

            expect(cartProductEntity._products).toBe(testProducts);
        });

        it('should create an instance of Cart without any product', () => {
            const cartEntity = new Cart();
            expect(cartEntity._products.length).toBe(0);
        });
    });


    describe('addProduct() Test Suite', () => {
        const cartEntity = new Cart();

        it('should change the product\'s quantity if it is already in the cart', () => {
            const testProductEntity = new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity);
            cartEntity._products = [testProductEntity];
            cartEntity.addProduct(testProducts[0]);
            expect(cartEntity._products[0].quantity).toBe(2 * testProducts[0].quantity);
        });

        it('should add the product to the cart', () => {
            cartEntity._products = [];
            const testProductEntity = new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity);
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


    describe('getData() Method Test Suite', () => {
        const cartEntity = new Cart();
        cartEntity._products = [new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity), new CartProduct(testProducts[1].id, testProducts[1].color, testProducts[1].quantity)];

        it('should return an array of cart products object data', () => {
            const data = cartEntity.getData();
            expect(data).toEqual(testProducts);
        });
    });
});