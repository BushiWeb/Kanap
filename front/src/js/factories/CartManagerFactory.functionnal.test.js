import { CartManagerFactory } from "./CartManagerFactory";
import { CartModel } from "../model/CartModel";

describe('CartManagerFactory Unit Test Suite', () => {
    describe('createCartManager() Method Test Suite', () => {
        it('should return an instance of CartManagerLocalStorage if called with "LocalStorage"', () => {
            const cartManager = CartManagerFactory.createCartManager('LocalStorage');
            expect(cartManager instanceof CartModel).toBeTruthy();
        });
    });

    describe('createCartManagerLocalStorage() Method Test Suite', () => {
        it('should return an instance of CartManagerLocalStorage', () => {
            const cartManager = CartManagerFactory.createCartManagerLocalStorage();
            expect(cartManager instanceof CartModel).toBeTruthy();
        });
    });
})