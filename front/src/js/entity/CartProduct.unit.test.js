import { CartProduct } from "./CartProduct";

import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('CartProduct Unit Test Suite', () => {
    const testProduct = {
        id: MOCKED_API_DATA[0]._id,
        color: MOCKED_API_DATA[0].colors[0],
        quantity: 4
    }

    describe('Constructor Test Suite', () => {
        it('should create an instance of CartProduct with the right informations', () => {
            const cartProductEntity = new CartProduct(testProduct.id, testProduct.color, testProduct.quantity);
            expect(cartProductEntity._id).toBe(testProduct.id);
            expect(cartProductEntity._color).toBe(testProduct.color);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity);
        });
    });


    describe('Getters Test Suite', () => {
        const cartProductEntity = new CartProduct(testProduct.id, testProduct.color, testProduct.quantity);

        it('should return the value of CartProduct._id', () => {
            expect(cartProductEntity.id).toBe(cartProductEntity._id);
        });

        it('should return the value of CartProduct._color', () => {
            expect(cartProductEntity.color).toBe(cartProductEntity._color);
        });

        it('should return the value of CartProduct._quantity', () => {
            expect(cartProductEntity.quantity).toBe(cartProductEntity._quantity);
        });
    });


    describe('Setters Test Suite', () => {
        const cartProductEntity = new CartProduct(testProduct.id, testProduct.color, testProduct.quantity);

        it('should set the value of CartProduct._quantity', () => {
            const newQuantity = 8;
            cartProductEntity.quantity = 8;
            expect(cartProductEntity._quantity).toBe(newQuantity);
        });
    });


    describe('addToQuantity() Method Test Suite', () => {
        const testQuantity = 4;
        const cartProductEntity = new CartProduct(testProduct.id, testProduct.color, testProduct.quantity);

        it('should add the test quantity to the current quantity', () => {
            cartProductEntity.addToQuantity(testQuantity);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity + testQuantity);
        });
    });


    describe('compare() Method Test Suite', () => {
        const cartProductEntity = new CartProduct(testProduct.id, testProduct.color, testProduct.quantity);
        const compareCartProduct = new CartProduct('id', 'color', 3);
        it('should return true if both products are identical', () => {
            compareCartProduct._id = cartProductEntity.id;
            compareCartProduct._color = cartProductEntity.color;
            expect(cartProductEntity.compare(compareCartProduct)).toBe(true);
        });

        it('should return false if the products don\'t have the same color', () => {
            compareCartProduct._id = cartProductEntity.id;
            compareCartProduct._color = 'color';
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });

        it('should return false if the products don\'t have the same id', () => {
            compareCartProduct._id = 'id';
            compareCartProduct._color = cartProductEntity.color;
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });

        it('should return false if the products don\'t have the same id and color', () => {
            compareCartProduct._id = 'id';
            compareCartProduct._color = 'color';
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });
    });
});