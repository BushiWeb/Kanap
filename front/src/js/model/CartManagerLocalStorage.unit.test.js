/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from "./CartManagerLocalStorage";
import { LocalStorageDao } from "../dao/LocalStorageDao";
import { Cart } from "../entity/Cart";

const mockGetData = jest.fn();
const mockSetData = jest.fn();
jest.mock('../dao/LocalStorageDao', () => {
    return {
        LocalStorageDao: jest.fn().mockImplementation(() => {
            return {
                getData: mockGetData,
                setData: mockSetData
            };
        })
    }
});

const mockGetEntityData = jest.fn();
const mockAddProduct = jest.fn();
jest.mock('../entity/Cart', () => {
    return {
        Cart: jest.fn().mockImplementation(() => {
            return {
                getData: mockGetEntityData,
                addProduct: mockAddProduct
            };
        })
    }
});

beforeEach(() => {
    mockSetData.mockClear();
    mockGetData.mockClear();
    mockGetEntityData.mockClear();
    mockAddProduct.mockClear();
    LocalStorageDao.mockClear();
    Cart.mockClear();
})


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
        it('should call the localStorageDao.getData() method if the cart is not in the manager, and set CartManagerLocalStorage.cartComplete to true', () => {
            cartManager.cartComplete = false;
            cartManager.getCart();
            expect(mockGetData).toHaveBeenCalled();
            expect(cartManager.cartComplete).toBeTruthy();
        });

        it('should create a new Cart instance and return it\'s data if the cart is not in the manager but in the localStorage', () => {
            cartManager.cartComplete = false;
            mockGetData.mockReturnValueOnce(cartExample);
            const cartData = cartManager.getCart();
            expect(Cart).toHaveBeenCalled();
            expect(Cart).toHaveBeenCalledWith(cartExample);
            expect(cartData).toEqual(cartManager.cart);
        });

        it('should create a new empty Cart instance and return it\'s data if the cart is not in the manager nor the localStorage', () => {
            cartManager.cartComplete = false;
            mockGetData.mockReturnValueOnce(undefined);
            const cartData = cartManager.getCart();
            expect(Cart).toHaveBeenCalled();
            expect(Cart).toHaveBeenCalledWith([]);
            expect(cartData).toEqual(cartManager.cart);
        });

        it('should return the cart\'s data if the cart is in the manager', () => {
            cartManager.cartComplete = true;
            mockGetEntityData.mockReturnValue(cartExample);
            const cartData = cartManager.getCart();
            expect(cartData).toEqual(cartManager.cart);
        });
    });


    describe('postCart() Method Test Suite', () => {
        it('should call the localStorageDao.setData() method with the right key and the cart object', () => {
            cartManager.postCart();
            expect(mockSetData).toHaveBeenCalled();
        });

        it('should call the Cart.getData() method', () => {
            cartManager.postCart();
            expect(mockGetEntityData).toHaveBeenCalled();
        });
    });


    describe('addProduct() Method Test Suite', () => {
        const getCartMock = jest.spyOn(cartManager, 'getCart');
        const postCartMock = jest.spyOn(cartManager, 'postCart');

        beforeEach(() => {
            getCartMock.mockReset();
            postCartMock.mockReset();
        });

        it('should call the getCart() method from the cart model', () => {
            cartManager.addProduct(cartExample[0]);
            expect(getCartMock).toHaveBeenCalled();
        });

        it('should call the Cart.addProduct() method', () => {
            cartManager.addProduct(cartExample[0]);
            expect(mockAddProduct).toHaveBeenCalled();
            expect(mockAddProduct).toHaveBeenCalledWith(cartExample[0]);
        });

        it('should call the CartManagerLocalStorage.postCart() method with the cart', () => {
            cartManager.addProduct(cartExample[0]);
            expect(postCartMock).toHaveBeenCalled();
        });
    });
});