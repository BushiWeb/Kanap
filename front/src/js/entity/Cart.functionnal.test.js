import { Cart } from './Cart';
import { CartProduct } from './CartProduct';
import { Product } from './Product';
import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('Cart Functionnal Test Suite', () => {
    const testProducts = [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            name: MOCKED_API_DATA[0].name,
            quantity: 4,
        },
        {
            id: MOCKED_API_DATA[1]._id,
            color: MOCKED_API_DATA[1].colors[0],
            name: MOCKED_API_DATA[1].name,
            quantity: 4,
        },
    ];

    const testCartProductEntities = [
        new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity, testProducts[0].name),
        new CartProduct(testProducts[1].id, testProducts[1].color, testProducts[1].quantity, testProducts[1].name),
    ];

    const testProductEntities = [
        new Product(
            MOCKED_API_DATA[0]._id,
            MOCKED_API_DATA[0].name,
            MOCKED_API_DATA[0].price,
            MOCKED_API_DATA[0].description,
            MOCKED_API_DATA[0].imageUrl,
            MOCKED_API_DATA[0].altTxt,
            MOCKED_API_DATA[0].colors
        ),
        new Product(
            MOCKED_API_DATA[1]._id,
            MOCKED_API_DATA[1].name,
            MOCKED_API_DATA[1].price,
            MOCKED_API_DATA[1].description,
            MOCKED_API_DATA[1].imageUrl,
            MOCKED_API_DATA[1].altTxt,
            MOCKED_API_DATA[1].colors
        ),
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

        it("should change the product's quantity if it is already in the cart", () => {
            cartEntity._products = [testCartProductEntities[0]];
            cartEntity.addProduct(testCartProductEntities[0]);
            expect(cartEntity._products[0].quantity).toBe(2 * testProducts[0].quantity);
        });

        it('should add the product to the cart', () => {
            cartEntity._products = [];
            cartEntity.addProduct(testCartProductEntities[0]);
            expect(cartEntity._products[0]).toEqual(testCartProductEntities[0]);
        });
    });

    describe('searchProduct() Test Suite', () => {
        const cartEntity = new Cart();

        it('should return the index of the product', () => {
            cartEntity._products = [testCartProductEntities[1], testCartProductEntities[0]];
            const searchResult = cartEntity.searchProduct(testCartProductEntities[0]);
            expect(searchResult).toBe(1);
        });

        it('should return false if the product is not in the cart', () => {
            cartEntity._products = [testCartProductEntities[1]];
            const searchResult = cartEntity.searchProduct(testCartProductEntities[0]);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same ID', () => {
            testCartProductEntities[1]._color = MOCKED_API_DATA[1].colors[0];
            testCartProductEntities[1]._id = testCartProductEntities[0].id;
            cartEntity._products = [testCartProductEntities[1]];
            const searchResult = cartEntity.searchProduct(testCartProductEntities[0]);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same color', () => {
            testCartProductEntities[1]._color = testCartProductEntities[0].color;
            testCartProductEntities[1]._id = MOCKED_API_DATA[1]._id;
            cartEntity._products = [testCartProductEntities[1]];
            const searchResult = cartEntity.searchProduct(testCartProductEntities[0]);
            expect(searchResult).toBe(false);
        });
    });

    describe('updateTotalPrice() Test Suite', () => {
        const cartEntity = new Cart();

        it('should update the total price', () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];
            const totalPrice =
                testCartProductEntities[0].quantity * testCartProductEntities[0].product._price +
                testCartProductEntities[1].quantity * testCartProductEntities[1].product._price;
            cartEntity.updateTotalPrice();
            expect(cartEntity._totalPrice).toBe(totalPrice);
        });

        it('should update the totalPrice to undefined if the CartProduct.product properties are missing', () => {
            cartEntity._products[1].product = undefined;
            cartEntity._totalPrice = 2;
            cartEntity.updateTotalPrice();
            expect(cartEntity._totalPrice).toBeUndefined();
        });
    });

    describe('updateTotalQuantity() Test Suite', () => {
        const cartEntity = new Cart();

        it('should update the total quantity', () => {
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];
            const totalQuantity = testCartProductEntities[0].quantity + testCartProductEntities[1].quantity;
            cartEntity.updateTotalQuantity();
            expect(cartEntity._totalQuantity).toBe(totalQuantity);
        });
    });

    describe('updateTotals() Test Suite', () => {
        const cartEntity = new Cart();

        it('should update the total quantity and price', () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            const totalQuantity = testCartProductEntities[0].quantity + testCartProductEntities[1].quantity;
            const totalPrice =
                testCartProductEntities[0].quantity * testCartProductEntities[0].product._price +
                testCartProductEntities[1].quantity * testCartProductEntities[1].product._price;
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];

            cartEntity.updateTotals();
            expect(cartEntity._totalQuantity).toBe(totalQuantity);
            expect(cartEntity._totalPrice).toBe(totalPrice);
        });
    });

    describe('deleteProduct() Test Suite', () => {
        const cartEntity = new Cart();

        it('should delete the product and update the total quantity and price and return true', () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];

            const newQuantity = testCartProductEntities[1].quantity;
            const newPrice = testCartProductEntities[1].quantity * testCartProductEntities[1].product._price;

            const result = cartEntity.deleteProduct(testCartProductEntities[0]);
            expect(cartEntity._products).not.toContainEqual(testCartProductEntities[0]);
            expect(cartEntity._totalQuantity).toBe(newQuantity);
            expect(cartEntity._totalPrice).toBe(newPrice);
            expect(result).toBe(true);
        });

        it("should return false if the product doesn't exist", () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[1]];

            const result = cartEntity.deleteProduct(testCartProductEntities[0]);
            expect(result).toBe(false);
        });
    });

    describe('updateProductQuantity() Test Suite', () => {
        const cartEntity = new Cart();

        it('should delete the product and update the total quantity and price and return true if the quantity is 0', () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];

            const newQuantity = testCartProductEntities[1].quantity;
            const newPrice = testCartProductEntities[1].quantity * testCartProductEntities[1].product._price;

            const result = cartEntity.updateProductQuantity(testCartProductEntities[0], 0);

            expect(cartEntity._products).not.toContainEqual(testCartProductEntities[0]);
            expect(cartEntity._totalQuantity).toBe(newQuantity);
            expect(cartEntity._totalPrice).toBe(newPrice);
            expect(result).toBe(true);
        });

        it("should update the product's quantity and update the total quantity and price and return true if the quantity is above 0", () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[0], testCartProductEntities[1]];

            const newQuantity = testCartProductEntities[1].quantity + 1;
            const newPrice =
                testCartProductEntities[1].quantity * testCartProductEntities[1].product._price +
                testCartProductEntities[0].product._price;

            const result = cartEntity.updateProductQuantity(testCartProductEntities[0], 1);

            expect(cartEntity._products[0]._quantity).toBe(1);
            expect(cartEntity._totalQuantity).toBe(newQuantity);
            expect(cartEntity._totalPrice).toBe(newPrice);
            expect(result).toBe(true);
        });

        it("should return false if the product doesn't exist", () => {
            testCartProductEntities[0].product = testProductEntities[0];
            testCartProductEntities[1].product = testProductEntities[1];
            cartEntity._products = [testCartProductEntities[1]];

            const result = cartEntity.updateProductQuantity(testCartProductEntities[0], 1);
            expect(result).toBe(false);
        });
    });
});
