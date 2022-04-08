import { CartManagerFactory } from '../../js/factories/CartManagerFactory';
import { CartManagerLocalStorage } from '../../js/model/CartManagerLocalStorage';

describe('CartManagerFactory Fonctionnal Test Suite', () => {
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
});
