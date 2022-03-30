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
        cartManager.cart.products.push(new CartProduct(MOCKED_API_DATA[0]._id, 'black', 12), new CartProduct('12', 'blue', 3));

        it('should give the first CartProduct it\'s corresponding Product entity, and the second one an Error', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok : true
            }).mockRejectedValueOnce(new Error());
            await cartManager.setCartProductProductInfos(productManager);
            expect(cartManager.cart._products[0]._product).toEqual(MOCKED_PRODUCT_ENTITY_DATA[0]);
            expect(cartManager.cart._products[1]._product instanceof Error).toBe(true);
        });
    });
});