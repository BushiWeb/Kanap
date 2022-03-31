/**
 * @jest-environment jsdom
 */

import { CartManager } from "./CartManager";
import { ProductManagerKanapApi } from "./ProductManagerKanapApi";
import { Cart } from "../entity/Cart";
import { CartProduct } from "../entity/CartProduct";
import { Product } from "../entity/Product";
import { MOCKED_API_DATA } from '../dao/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from './mockedProductEntityData';
import { CONFIG } from '../config/config';

global.fetch = jest.fn();

beforeEach(() => {
    global.fetch.mockReset();
})


describe('CartModel Unit Test Suite', () => {
    const productManager = new ProductManagerKanapApi(CONFIG);


    describe('setCartProductProductInfos() Method Test Suite', () => {
        let cartManager = new CartManager();
        cartManager.cart.products.push(new CartProduct('12', 'blue', 3, 'falseName'), new CartProduct(MOCKED_API_DATA[0]._id, 'black', 12, 'name'));

        it('should delete the first CartProduct and give the second one it\'s corresponding Product entity', async () => {
            global.fetch.mockRejectedValueOnce(new Error()).mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok : true
            });
            const errorArray = await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart._products.length).toBe(1);
            expect(cartManager.cart._products[0]._product).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
            expect(errorArray.length).toBe(1);
            expect(errorArray[0]).toMatch(new RegExp('.*falseName.*'));
        });
    });
});