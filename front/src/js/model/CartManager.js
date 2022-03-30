import { Cart } from "../entity/Cart";
import { ProductManager } from "./ProductManager";

/**
 * Parent class for all Cart managers.
 */
export class CartManager {
    /**
     * Set up the entities and the boolean indicating if the cart is complete.
     */
    constructor() {
        this.cart = new Cart();
        this.cartComplete = false;
        this.dao = undefined;
    }


    /**
     *
     * @param {ProductManager} productManager - ProductManager instance to fetch product's informations.
     */
    async setCartProductProductInfos(productManager) {
        for (let cartProduct of this.cart.products) {
            try {
                cartProduct.product = await productManager.getProduct(cartProduct.id);
            } catch (error) {
                cartProduct.product = error;
            }
        }
    }
}