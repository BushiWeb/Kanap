/**
 * @jest-environment jsdom
 */

import { CartManager } from '../../js/model/CartManager';
import { ProductManagerKanapApi } from '../../js/model/ProductManagerKanapApi';
import { CartProduct } from '../../js/entity/CartProduct';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { MOCKED_CART_DATA } from '../data/mockedCartData';
import { CONFIG_TEST } from '../data/mocked-configuration';

global.fetch = jest.fn();
CartManager.prototype.postCart = jest.fn();
CartManager.prototype.getCart = jest.fn();
CartManager.prototype.generateCartProductFromData = jest.fn();

beforeEach(() => {
    global.fetch.mockReset();
    CartManager.prototype.postCart.mockClear();
    CartManager.prototype.getCart.mockClear();
    CartManager.prototype.generateCartProductFromData.mockClear();
});

describe('CartModel Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi(CONFIG_TEST);

    describe('setCartProductProductInfos() Method Test Suite', () => {
        let cartManager = new CartManager();
        cartManager.cart.products.push(
            new CartProduct('12', 'blue', 3, 'falseName'),
            new CartProduct(MOCKED_API_DATA[0]._id, 'black', 12, 'name')
        );

        it("should delete the first CartProduct and give the second one it's corresponding Product entity", async () => {
            global.fetch.mockRejectedValueOnce(new Error()).mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok: true,
            });
            const errorArray = await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart._products.length).toBe(1);
            expect(cartManager.cart._products[0]._product).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
            expect(errorArray.length).toBe(1);
            expect(errorArray[0]).toMatch(new RegExp('falseName'));
        });
    });

    describe('deleteProduct() Method Test Suite', () => {
        let cartManager = new CartManager();
        const productToDelete = new CartProduct('21', 'blue', 2, 'name1');

        beforeEach(() => {
            cartManager.cart.products = [
                productToDelete,
                new CartProduct(
                    MOCKED_CART_DATA.cartData[0].id,
                    MOCKED_CART_DATA.cartData[0].color,
                    MOCKED_CART_DATA.cartData[0].quantity,
                    MOCKED_CART_DATA.cartData[0].name
                ),
                new CartProduct(
                    MOCKED_CART_DATA.cartData[1].id,
                    MOCKED_CART_DATA.cartData[1].color,
                    MOCKED_CART_DATA.cartData[1].quantity,
                    MOCKED_CART_DATA.cartData[1].name
                ),
                new CartProduct(
                    MOCKED_CART_DATA.cartData[2].id,
                    MOCKED_CART_DATA.cartData[2].color,
                    MOCKED_CART_DATA.cartData[2].quantity,
                    MOCKED_CART_DATA.cartData[2].name
                ),
            ];
            cartManager.cartComplete = true;
        });

        it('should delete the product from the cart', async () => {
            localStorage.setItem('cart', '');
            cartManager.generateCartProductFromData.mockReturnValue(productToDelete);
            cartManager.deleteProduct(productToDelete.id, productToDelete.color);
            expect(cartManager.cart._products).not.toContainEqual(productToDelete);
        });
    });

    describe('updateProductQuantity() Method Test Suite', () => {
        let cartManager = new CartManager();
        let productToUpdate;

        beforeEach(() => {
            productToUpdate = new CartProduct(
                MOCKED_CART_DATA.cartData[0].id,
                MOCKED_CART_DATA.cartData[0].color,
                MOCKED_CART_DATA.cartData[0].quantity,
                MOCKED_CART_DATA.cartData[0].name
            );

            cartManager.cart.products = [
                productToUpdate,
                new CartProduct(
                    MOCKED_CART_DATA.cartData[1].id,
                    MOCKED_CART_DATA.cartData[1].color,
                    MOCKED_CART_DATA.cartData[1].quantity,
                    MOCKED_CART_DATA.cartData[1].name
                ),
                new CartProduct(
                    MOCKED_CART_DATA.cartData[2].id,
                    MOCKED_CART_DATA.cartData[2].color,
                    MOCKED_CART_DATA.cartData[2].quantity,
                    MOCKED_CART_DATA.cartData[2].name
                ),
            ];
            cartManager.cartComplete = true;
        });

        it('should delete the product from the cart if quantity is 0', async () => {
            cartManager.generateCartProductFromData.mockReturnValue(productToUpdate);
            cartManager.updateProductQuantity(productToUpdate.id, productToUpdate.color, 0);
            expect(cartManager.cart._products).not.toContainEqual(productToUpdate);
        });

        it('should update the products quantity if quantity is above 0', async () => {
            cartManager.generateCartProductFromData.mockReturnValue(productToUpdate);
            cartManager.updateProductQuantity(productToUpdate.id, productToUpdate.color, 1);
            expect(cartManager.cart._products[0].quantity).toBe(1);
        });
    });
});