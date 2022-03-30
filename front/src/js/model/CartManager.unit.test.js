/**
 * @jest-environment jsdom
 */

import { CartManager } from "./CartManager";
import { ProductManagerKanapApi } from "./ProductManagerKanapApi";
import { Cart } from "../entity/Cart";
import { CartProduct } from "../entity/CartProduct";
import { Product } from "../entity/Product";

jest.mock('../entity/Cart', () => {
    return {
        Cart: jest.fn().mockImplementation(() => {
            return {
                products: []
            };
        })
    }
});

jest.mock('../entity/CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation((id) => {
            return {
                product : undefined,
                id: id
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

beforeEach(() => {
    Cart.mockClear();
    CartProduct.mockClear();
    mockGetProduct.mockReset();
    ProductManagerKanapApi.mockClear();
})


describe('CartModel Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi();


    describe('setCartProductProductInfos() Method Test Suite', () => {
        let cartManager = new CartManager();
        cartManager.cart.products.push(new CartProduct('21'), new CartProduct('12'));

        it('should call the ProductManager.getProduct() method', async () => {
            await cartManager.setCartProductProductInfos(productManager);
            expect(mockGetProduct).toHaveBeenCalledTimes(2);
        });

        it('should give each CartProduct it\'s corresponding Product entity', async () => {
            const returnedProduct = new Product('1', 'name', 123, 'desc', 'url', 'alt', []);
            mockGetProduct.mockReturnValue(returnedProduct);
            await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart.products[0].product).toBe(returnedProduct);
            expect(cartManager.cart.products[1].product).toBe(returnedProduct);
        });

        it('should give each CartProduct an error if the Product entity can\'t be created', async () => {
            mockGetProduct.mockImplementation(() => { throw new Error(); });
            await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart.products.length).toBe(0);
        });
    });
});