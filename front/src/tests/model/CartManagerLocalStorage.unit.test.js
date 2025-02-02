/**
 * @jest-environment jsdom
 */

import { CartManagerLocalStorage } from '../../js/model/CartManagerLocalStorage';
import { LocalStorageDao } from '../../js/dao/LocalStorageDao';
import { Cart } from '../../js/entity/Cart';
import { CartProduct } from '../../js/entity/CartProduct';

const mockGetData = jest.fn();
const mockSetData = jest.fn();
jest.mock('../../js/dao/LocalStorageDao', () => {
    return {
        LocalStorageDao: jest.fn().mockImplementation(() => {
            return {
                getData: mockGetData,
                setData: mockSetData,
            };
        }),
    };
});

const mockGetEntityData = jest.fn();
const mockAddProduct = jest.fn();
jest.mock('../../js/entity/Cart', () => {
    return {
        Cart: jest.fn().mockImplementation(() => {
            return {
                products: [],
                getData: mockGetEntityData,
                addProduct: mockAddProduct,
            };
        }),
    };
});

jest.mock('../../js/entity/CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

beforeEach(() => {
    mockSetData.mockClear();
    mockGetData.mockClear();
    mockGetEntityData.mockClear();
    mockAddProduct.mockClear();
    LocalStorageDao.mockClear();
    Cart.mockClear();
    CartProduct.mockClear();
});

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
        const generateCartFromDataMock = jest.spyOn(cartManager, 'generateCartFromData');

        beforeEach(() => {
            generateCartFromDataMock.mockReset();
        });

        afterAll(() => {
            generateCartFromDataMock.mockRestore();
        });
        it('should call the localStorageDao.getData() method if the cart is not in the manager, and set CartManagerLocalStorage.cartComplete to true', () => {
            cartManager.cartComplete = false;
            cartManager.getCart();
            expect(mockGetData).toHaveBeenCalled();
            expect(cartManager.cartComplete).toBeTruthy();
        });

        it('should call generateCartFromData() method and return the cart data if the cart is not in the manager but in the localStorage', () => {
            cartManager.cartComplete = false;
            mockGetData.mockReturnValueOnce(cartExample);
            const cartData = cartManager.getCart();
            expect(generateCartFromDataMock).toHaveBeenCalled();
            expect(generateCartFromDataMock).toHaveBeenCalledWith(cartExample);
            expect(cartData).toEqual(cartManager.cart);
        });

        it('should call generateCartFromData() method with an ampty array and return the cart data if the cart is not in the manager nor the localStorage', () => {
            cartManager.cartComplete = false;
            mockGetData.mockReturnValueOnce(undefined);
            const cartData = cartManager.getCart();
            expect(generateCartFromDataMock).toHaveBeenCalled();
            expect(generateCartFromDataMock).toHaveBeenCalledWith([]);
            expect(cartData).toEqual(cartManager.cart);
        });

        it("should return the cart's data if the cart is in the manager", () => {
            cartManager.cartComplete = true;
            mockGetEntityData.mockReturnValue(cartExample);
            const cartData = cartManager.getCart();
            expect(cartData).toEqual(cartManager.cart);
        });
    });

    describe('addProduct() Method Test Suite', () => {
        const getCartMock = jest.spyOn(cartManager, 'getCart');
        const postCartMock = jest.spyOn(cartManager, 'postCart');
        const generateCartProductMock = jest.spyOn(cartManager, 'generateCartProductFromData');

        beforeEach(() => {
            getCartMock.mockReset();
            postCartMock.mockReset();
            generateCartProductMock.mockReset();
        });

        it('should call the getCart() method from the cart model', () => {
            cartManager.addProduct(cartExample[0]);
            expect(getCartMock).toHaveBeenCalled();
        });

        it('should call the generateCartProductFromData() method from the cart model', () => {
            cartManager.addProduct(cartExample[0]);
            expect(generateCartProductMock).toHaveBeenCalled();
        });

        it('should call the Cart.addProduct() method', () => {
            cartManager.addProduct(cartExample[0]);
            expect(mockAddProduct).toHaveBeenCalled();
        });

        it('should call the CartManagerLocalStorage.postCart() method with the cart', () => {
            cartManager.addProduct(cartExample[0]);
            expect(postCartMock).toHaveBeenCalled();
        });
    });

    describe('resetCart() Method Test Suite', () => {
        const mockPostCart = jest.spyOn(cartManager, 'postCart');

        beforeEach(() => {
            mockPostCart.mockReset();
        });

        afterAll(() => {
            mockPostCart.mockRestore();
        });

        it('should call the Cart constructor', () => {
            cartManager.resetCart();
            expect(Cart).toHaveBeenCalled();
        });

        it('should call the postCart() method', () => {
            cartManager.resetCart();
            expect(mockPostCart).toHaveBeenCalled();
        });
    });

    describe('postCart() Method Test Suite', () => {
        const generateDataFromCartMock = jest.spyOn(cartManager, 'generateDataFromCart');

        beforeEach(() => {
            generateDataFromCartMock.mockReset();
        });

        afterAll(() => {
            generateDataFromCartMock.mockRestore();
        });

        it('should call the localStorageDao.setData() method with the right key and the cart object', () => {
            cartManager.postCart();
            expect(mockSetData).toHaveBeenCalled();
        });

        it('should call the Cart.getData() method', () => {
            cartManager.postCart();
            expect(generateDataFromCartMock).toHaveBeenCalled();
        });
    });
});
