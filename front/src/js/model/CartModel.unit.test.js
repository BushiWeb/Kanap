/**
 * @jest-environment jsdom
 */

import { CartModel } from "./CartModel";


describe('CartModel Unit Test Suite', () => {
    const localStorageGetItemMock = jest.spyOn(Storage.prototype, 'getItem');
    const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');
    const cartExample = [
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

    const testCartModel = new CartModel();

    beforeEach(() => {
        localStorageGetItemMock.mockReset();
        localStorageSetItemMock.mockReset();
    });


    describe('getCart() Method Test Suite', () => {
        it('should return the parsed cart object if there is a cart object in the local storage', () => {
            localStorageGetItemMock.mockReturnValue(JSON.stringify(cartExample));
            const cartContent = testCartModel.getCart();
            expect(cartContent).toEqual(cartExample);
        });

        it('should return an empty array if there is no cart object in the local storage', () => {
            localStorageGetItemMock.mockReturnValue(undefined);
            const cartContent = testCartModel.getCart();
            expect(cartContent).toEqual([]);
        });
    });


    describe('postCart() Method Test Suite', () => {
        it('should call the localStorage setItem() with the right key and the serialized cart object as arguments', () => {
            testCartModel.postCart(cartExample);
            expect(localStorageSetItemMock).toHaveBeenCalled();
            expect(localStorageSetItemMock).toHaveBeenCalledWith(testCartModel.storageName, JSON.stringify(cartExample));
        });
    });


    describe('addProduct() Method Test Suite', () => {
        const getCartMock = jest.spyOn(testCartModel, 'getCart');
        const postCartMock = jest.spyOn(testCartModel, 'postCart');

        beforeEach(() => {
            getCartMock.mockReset();
            postCartMock.mockReset();
            getCartMock.mockReturnValue(cartExample);
        });

        it('should call the getCart() method from the cart model', () => {
            testCartModel.addProduct({ id: 'test' });
            expect(getCartMock).toHaveBeenCalled();
        });

        it('should call the postCart() method from the cart model with the returned object plus one product if this is a new product', () => {
            const testProduct = {
                id: '4',
                color: 'green',
                quantity: 4
            };
            const newCart = cartExample;
            newCart.push(testProduct);

            testCartModel.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });

        it('should call the postCart() method from the cart model with the returned object plus one product if the product is already in the cart but with another color', () => {
            const testProduct = cartExample[0];
            testProduct.color = 'indigo';
            testProduct.quantity = 2;
            const newCart = cartExample;
            newCart.push(testProduct);

            testCartModel.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });

        it('should call the postCart() method from the cart model with the returned object with the quantity modified if the product is already in the cart (same product and color)', () => {
            const testProduct = cartExample[0];
            testProduct.quantity = 2;
            const newCart = cartExample;
            newCart[0].quantity += testProduct.quantity;

            testCartModel.addProduct(testProduct);
            expect(postCartMock).toHaveBeenCalled();
            expect(postCartMock).toHaveBeenCalledWith(newCart);
        });
    })
});