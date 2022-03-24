import { CartManagerFactory } from "./CartManagerFactory";
import { CartManagerLocalStorage } from "../model/CartManagerLocalStorage";

describe('CartManagerFactory Unit Test Suite', () => {
    describe('createCartManager() Method Test Suite', () => {
        it('should return an instance of CartManagerLocalStorage if called with "LocalStorage"', () => {
            const cartManager = CartManagerFactory.createCartManager('LocalStorage');
            expect(cartManager instanceof CartManagerLocalStorage).toBeTruthy();
        });
    });

    describe('createCartManagerLocalStorage() Method Test Suite', () => {
        it('should return an instance of CartManagerLocalStorage', () => {
            const cartManager = CartManagerFactory.createCartManagerLocalStorage();
            expect(cartManager instanceof CartManagerLocalStorage).toBeTruthy();
        });
    });
})