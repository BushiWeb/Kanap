import { CartProduct } from "./CartProduct";

import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('CartProduct Unit Test Suite', () => {

    describe('Constructor Test Suite', () => {
        it('should create an instance of CartProduct with the right informations', () => {
            const testProduct = {
                _id: MOCKED_API_DATA[0]._id,
                color: MOCKED_API_DATA[0].colors[0],
                quantity: 4
            }
            const cartProductEntity = new CartProduct(testProduct._id, testProduct.color, testProduct.quantity);
            expect(cartProductEntity._id).toBe(testProduct._id);
            expect(cartProductEntity._color).toBe(testProduct.color);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity);
        });
    });


    describe('Getters Test Suite', () => {
        const testProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        }
        const cartProductEntity = new CartProduct(testProduct._id, testProduct.color, testProduct.quantity);

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
        const testProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        }
        const cartProductEntity = new CartProduct(testProduct._id, testProduct.color, testProduct.quantity);

        it('should set the value of CartProduct._quantity', () => {
            const newQuantity = 8;
            cartProductEntity.quantity = 8;
            expect(cartProductEntity._quantity).toBe(newQuantity);
        });
    });


    describe('addToQuantity() Method Test Suite', () => {
        const testQuantity = 4;
        const testProduct = {
            _id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: testQuantity
        }
        const cartProductEntity = new CartProduct(testProduct._id, testProduct.color, testProduct.quantity);

        it('should add the test quantity to the current quantity', () => {
            cartProductEntity.addToQuantity(testQuantity);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity + testQuantity);
        });
    });
});