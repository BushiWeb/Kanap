/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from "./CartManagerLocalStorage";


describe('CartModel Unit Test Suite', () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');
    const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');
    let cartExample;

    const cartManager = new CartManagerLocalStorage();

    beforeEach(() => {
        localStorageGetItemMock.mockReset();
        localStorageSetItemMock.mockReset();
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
        it('should call the localStorage.getItem() method', () => {
            localStorageGetItemMock.mockReturnValue(JSON.stringify(cartExample));
            cartManager.getCart();
            expect(localStorageGetItemMock).toHaveBeenCalled();
            expect(localStorageGetItemMock).toHaveBeenCalledWith(cartManager.storageName);
        });

        it('should return the parsed cart object if there is a cart object in the localStorage', () => {
            localStorageGetItemMock.mockReturnValue(JSON.stringify(cartExample));
            const cartContent = cartManager.getCart();
            expect(cartContent).toEqual(cartExample);
        });

        it('should return an empty array if there is no cart object in the localStorage', () => {
            localStorageGetItemMock.mockReturnValue(undefined);
            const cartContent = cartManager.getCart();
            expect(cartContent).toEqual([]);
        });
    });


    describe('postCart() Method Test Suite', () => {
        it('should call the localStorage.setItem() method with the right key and the serialized cart object', () => {
            cartManager.postCart(cartExample);
            expect(localStorageSetItemMock).toHaveBeenCalled();
            expect(localStorageSetItemMock).toHaveBeenCalledWith(cartManager.storageName, JSON.stringify(cartExample));
        });
    });


    describe('addProduct() Method Test Suite', () => {
        const getCartMock = jest.spyOn(cartManager, 'getCart');
        const postCartMock = jest.spyOn(cartManager, 'postCart');

        beforeEach(() => {
            getCartMock.mockReset();
            postCartMock.mockReset();
            getCartMock.mockReturnValue(cartExample);
        });

        it('should call the getCart() method from the cart model', () => {
            cartManager.addProduct({ id: 'test' });
            expect(getCartMock).toHaveBeenCalled();
        });

        it('should call the CartModel.postCart() method with the cart containing one more product', () => {
            const testProduct = {
                id: '4',
                color: 'green',
                quantity: 4
            };
            const newCart = cartExample.concat(testProduct);

            cartManager.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });

        it('should call the CartModel.postCart() method with the cart containing one more product if the new product has the same id but a different color than another product in the cart', () => {
            const testProduct = Object.assign({}, cartExample[0]);
            testProduct.color = 'indigo';
            testProduct.quantity = 2;
            const newCart = cartExample.concat(testProduct);

            cartManager.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });

        it('should call the CartModel.postCart() method with the cart having the updated quantity for the product that has been added and was already present', () => {
            const testProduct = Object.assign({}, cartExample[0]);
            testProduct.quantity = 2;
            const newCart = JSON.parse(JSON.stringify(cartExample));
            newCart[0].quantity += testProduct.quantity;

            cartManager.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });
    })
});