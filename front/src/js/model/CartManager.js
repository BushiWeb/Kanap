import { Cart } from "../entity/Cart";

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
}