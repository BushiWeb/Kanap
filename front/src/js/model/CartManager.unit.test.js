/**
 * @jest-environment jsdom
 */

import { CartManager } from "./CartManager";
import { ProductManagerKanapApi } from "./ProductManagerKanapApi";
import { Cart } from "../entity/Cart";
import { CartProduct } from "../entity/CartProduct";
import { Product } from "../entity/Product";

const mockDeleteProduct = jest.fn();
jest.mock('../entity/Cart', () => {
    return {
        Cart: jest.fn().mockImplementation(() => {
            return {
                products: [],
                deleteProduct: mockDeleteProduct
            };
        })
    }
});

jest.mock('../entity/CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation((id, color, quantity, name) => {
            return {
                product : undefined,
                id: id,
                color: color,
                quantity: quantity,
                name: name
            };
        })
    }
});

const mockGetProduct = jest.fn();
jest.mock('./ProductManagerKanapApi', () => {
    return {
        ProductManagerKanapApi: jest.fn().mockImplementation(() => {
            return {
                getProduct: mockGetProduct
            };
        })
    }
});

CartManager.prototype.postCart = jest.fn();
CartManager.prototype.getCart = jest.fn();
CartManager.prototype.generateCartProductFromData = jest.fn();

beforeEach(() => {
    mockDeleteProduct.mockClear();
    Cart.mockClear();
    CartProduct.mockClear();
    mockGetProduct.mockReset();
    ProductManagerKanapApi.mockClear();
    CartManager.prototype.postCart.mockClear();
    CartManager.prototype.getCart.mockClear();
    CartManager.prototype.generateCartProductFromData.mockClear();
})


describe('CartModel Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi();


    describe('setCartProductProductInfos() Method Test Suite', () => {
        let cartManager = new CartManager();

        beforeEach(() => {
            cartManager.cart.products = [new CartProduct('21', 'blue', 2, 'name1'), new CartProduct('12', 'red', 1, 'name2')];
        });

        it('should call the ProductManager.getProduct() method', async () => {
            await cartManager.setCartProductProductInfos(productManager);
            expect(mockGetProduct).toHaveBeenCalledTimes(2);
        });

        it('should give each CartProduct it\'s corresponding Product entity', async () => {
            const returnedProduct = new Product('1', 'name', 123, 'desc', 'url', 'alt', []);
            mockGetProduct.mockReturnValue(returnedProduct);
            const errorArray = await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart.products[0].product).toBe(returnedProduct);
            expect(cartManager.cart.products[1].product).toBe(returnedProduct);
            expect(errorArray.length).toBe(0);
            expect(cartManager.postCart).not.toHaveBeenCalled();
        });

        it('should give each CartProduct an error if the Product entity can\'t be created', async () => {
            mockGetProduct.mockImplementation(() => { throw new Error(); });
            const errorArray = await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart.products.length).toBe(0);
            expect(errorArray.length).toBe(2);
            expect(errorArray[0]).toMatch(new RegExp('name1'));
            expect(errorArray[1]).toMatch(new RegExp('name2'));
            expect(cartManager.postCart).toHaveBeenCalled();
        });
    });


    describe('deleteProduct() Method Test Suite', () => {
        let cartManager = new CartManager();
        const productToDelete = new CartProduct('21', 'blue', 2, 'name1');

        beforeEach(() => {
            cartManager.cart.products = [productToDelete, new CartProduct('12', 'red', 1, 'name2')];
        });

        it('should call the generateCartProductFromData() method', async () => {
            cartManager.deleteProduct(productToDelete.id, productToDelete.color);
            expect(cartManager.generateCartProductFromData).toHaveBeenCalled();
        });

        it('should call the Cart.deleteProduct() method', async () => {
            cartManager.deleteProduct(productToDelete.id, productToDelete.color);
            expect(mockDeleteProduct).toHaveBeenCalled();
        });

        it('should call the postCart() method if the product existed', async () => {
            mockDeleteProduct.mockReturnValue(true);
            cartManager.deleteProduct(productToDelete.id, productToDelete.color);
            expect(cartManager.postCart).toHaveBeenCalled();
        });
    });
});