/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from './CartManagerLocalStorage';
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
                quantity: 3,
                name: 'name1',
            },
            {
                id: '2',
                color: 'pink',
                quantity: 6,
                name: 'name2',
            },
            {
                id: '3',
                color: 'red',
                quantity: 2,
                name: 'name3',
            },
        ];
    });

    describe('getCart() Method Test Suite', () => {
        it("should return a Cart entity if the manager doesn't contain the cart but the localStorage does", () => {
            cartManager.cartComplete = false;
            localStorage.setItem(cartManager.storageName, JSON.stringify(cartExample));
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect(cartManager.generateDataFromCart()).toEqual(cartExample);
        });

        it('should return a Cart entity if neither the manager nor the localStorage contains the cart', () => {
            cartManager.cartComplete = false;
            localStorage.clear();
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect(cartManager.generateDataFromCart()).toEqual([]);
        });

        it('should return a Cart entity if the cart is in the manager', () => {
            cartManager.cartComplete = true;
            let cartProducts = [];
            for (let i = 0; i < cartExample.length; i++) {
                cartProducts.push(new CartProduct(cartExample[i].id, cartExample[i].color, cartExample[i].quantity));
            }
            cartManager.cart = new Cart(cartExample);
            const cartData = cartManager.getCart();
            expect(cartData instanceof Cart).toBeTruthy();
            expect(cartManager.generateDataFromCart()).toEqual(cartExample);
        });
    });

    describe('resetCart() Method Test Suite', () => {
        it('should reset the Cart entity', () => {
            cartManager.cart = new Cart(cartExample);
            cartManager.resetCart();
            expect(cartManager.cart).toEqual(new Cart());
        });

        it('should reset the cart in the localStorage', () => {
            localStorage.setItem(cartManager.storageName, JSON.stringify(cartExample));
            cartManager.resetCart();
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual([]);
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
        beforeEach(() => {
            cartManager.cart = new Cart([
                new CartProduct(cartExample[0].id, cartExample[0].color, cartExample[0].quantity, cartExample[0].name),
                new CartProduct(cartExample[1].id, cartExample[1].color, cartExample[1].quantity, cartExample[1].name),
            ]);
        });
        it("should add a product if the cart doesn't contain the product", () => {
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it("should add a product if the cart doesn't contain the product but contains a product with the same id", () => {
            cartExample[2].id = cartExample[0].id;
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it("should add a product if the cart doesn't contain the product but contains a product with the same color", () => {
            cartExample[2].color = cartExample[0].color;
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))).toEqual(cartExample);
        });

        it("should change the product's quantity if the product is already in the manager", () => {
            cartExample[2].color = cartExample[0].color;
            cartExample[2].id = cartExample[0].id;
            localStorage.clear();
            cartManager.addProduct(cartExample[2]);
            expect(JSON.parse(localStorage.getItem(cartManager.storageName))[0].quantity).toEqual(
                cartExample[0].quantity + cartExample[2].quantity
            );
        });
    });

    describe('generateCartFromData() Method Test Suite', () => {
        cartManager.cart = new Cart();

        it('should call the generateCartProductFromData() method from the cart model', () => {
            cartManager.generateCartFromData(cartExample);
            const cartProducts = cartManager.cart.products;
            expect(cartProducts.length).toBe(cartExample.length);
            for (let i = 0; i < cartProducts.length; i++) {
                expect(cartProducts[i]).toEqual(
                    new CartProduct(
                        cartExample[i].id,
                        cartExample[i].color,
                        cartExample[i].quantity,
                        cartExample[i].name
                    )
                );
            }
        });
    });

    describe('generateCartProductFromData() Method Test Suite', () => {
        it('should return a CartProduct with the right data', () => {
            const cartProductGen = cartManager.generateCartProductFromData(cartExample[0]);
            expect(cartProductGen instanceof CartProduct).toBeTruthy();
            expect(cartProductGen.id).toBe(cartExample[0].id);
            expect(cartProductGen.quantity).toBe(cartExample[0].quantity);
            expect(cartProductGen.color).toBe(cartExample[0].color);
            expect(cartProductGen.name).toBe(cartExample[0].name);
        });
    });

    describe('generateDataFromCart() Method Test Suite', () => {
        it('should return the data object', () => {
            cartManager.cart = new Cart();
            cartManager.cart.products = [
                new CartProduct(cartExample[0].id, cartExample[0].color, cartExample[0].quantity, cartExample[0].name),
                new CartProduct(cartExample[1].id, cartExample[1].color, cartExample[1].quantity, cartExample[1].name),
                new CartProduct(cartExample[2].id, cartExample[2].color, cartExample[2].quantity, cartExample[2].name),
            ];
            const dataGen = cartManager.generateDataFromCart();
            expect(dataGen).toEqual(cartExample);
        });
    });

    describe('generateDataFromCart() Method Test Suite', () => {
        it('should return the data object', () => {
            const dataGen = cartManager.generateDataFromCartProduct(
                new CartProduct(cartExample[0].id, cartExample[0].color, cartExample[0].quantity, cartExample[0].name)
            );
            expect(dataGen).toEqual(cartExample[0]);
        });
    });
});
