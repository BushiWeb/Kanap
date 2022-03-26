/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from "./CartManagerLocalStorage";
import { Cart } from '../entity/Cart';
import { CartProduct } from '../entity/CartProduct';


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
    });


    describe('getCart() Method Test Suite', () => {
        it('should return a Cart entity if the manager doesn\'t contain the cart but the localStorage does', () => {
            cartManager.cartComplete = false;
            localStorage.setItem(cartManager.storageName, JSON.stringify(cartExample));
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect(cartData.getData()).toEqual(cartExample);
        });

        it('should return a Cart entity if neither the manager nor the localStorage contains the cart', () => {
            cartManager.cartComplete = false;
            localStorage.clear();
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect(cartData.getData()).toEqual([]);
        });

        it('should return a Cart entity if the cart is in the manager', () => {
            cartManager.cartComplete = true;
            let cartProducts = [];
            for (let i = 0 ; i < cartExample.length ; i++) {
                cartProducts.push(new CartProduct(cartExample[i].id, cartExample[i].color, cartExample[i].quantity));
            }
            cartManager.cart = new Cart(cartExample);
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect((cartData.getData())).toEqual(cartExample);
        });
    });


    describe('postCart() Method Test Suite', () => {
        it('should store the data in the localStorage', () => {
            cartManager.cart = new Cart(cartExample);
            localStorage.clear();
            cartManager.postCart();
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });
    });


    describe('addProduct() Method Test Suite', () => {
        it('should add a product if the cart doesn\'t contain the product', () => {
            cartManager.cart = new Cart(cartExample.slice(0, 2));
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it('should add a product if the cart doesn\'t contain the product but contains a product with the same id', () => {
            cartExample[0].id = cartExample[2].id;
            cartManager.cart = new Cart(cartExample.slice(0, 2));
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it('should add a product if the cart doesn\'t contain the product but contains a product with the same color', () => {
            cartExample[0].color = cartExample[2].color;
            cartManager.cart = new Cart(cartExample.slice(0, 2));
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it('should change the product\'s quantity if the product is already in the manager', () => {
            const testQuantity = 2;
            cartExample[2].quantity = testQuantity;
            cartManager.cart = new Cart(cartExample);
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))[2].quantity).toEqual(2 * testQuantity);
        });
    });
});