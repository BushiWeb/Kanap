/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from "./CartManagerLocalStorage";


describe('CartModel Unit Test Suite', () => {
    let cartExample;

    const cartManager = new CartManagerLocalStorage();

    beforeEach(() => {
        cartExample = [
            {
                id: '1',
                color: 'blue',
                quantity: 3
            },
            {
                id: '2',
                color: 'pink',
                quantity: 6
            },
            {
                id: '3',
                color: 'red',
                quantity: 2
            }
        ];
        localStorage.removeItem(cartManager.storageName);
    });


    describe('getCart() Method Test Suite', () => {
        it('should return the cart object', () => {
            localStorage.setItem(cartManager.storageName, JSON.stringify(cartExample));
            const cartContent = cartManager.getCart();
            expect(cartContent).toEqual(cartExample);
        });

        it('should return an empty array if there is no cart object in the localStorage', () => {
            const cartContent = cartManager.getCart();
            expect(cartContent).toEqual([]);
        });
    });


    describe('postCart() Method Test Suite', () => {
        it('should add the cart object to the localStorage', () => {
            cartManager.postCart(cartExample);
            expect(localStorage.getItem(cartManager.storageName)).toBe(JSON.stringify(cartExample));
        });
    });


    describe('addProduct() Method Test Suite', () => {
        beforeEach(() => {
            localStorage.setItem(cartManager.storageName, JSON.stringify(cartExample));
        })

        it('should add one product to the cart', () => {
            const testProduct = {
                id: '4',
                color: 'green',
                quantity: 4
            };
            const newCart = cartExample.concat(testProduct);

            cartManager.addProduct(testProduct);
            expect(localStorage.getItem(cartManager.storageName)).toBe(JSON.stringify(newCart));
        });

        it('should add one product to the cart even if the product is already in the cart but with a different color', () => {
            const testProduct = Object.assign({}, cartExample[0]);
            testProduct.color = 'indigo';
            testProduct.quantity = 2;
            const newCart = cartExample.concat(testProduct);

            cartManager.addProduct(testProduct);
            expect(localStorage.getItem(cartManager.storageName)).toBe(JSON.stringify(newCart));
        });

        it('should change the quantity of one product if the added product is already in the cart with the same color', () => {
            const testProduct = Object.assign({}, cartExample[0]);
            testProduct.quantity = 2;
            const newCart = JSON.parse(JSON.stringify(cartExample));
            newCart[0].quantity += testProduct.quantity;

            cartManager.addProduct(testProduct);
            expect(localStorage.getItem(cartManager.storageName)).toBe(JSON.stringify(newCart));
        });
    })
});