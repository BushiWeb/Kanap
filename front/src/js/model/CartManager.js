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
        const errorArray = [];

        for (let i = 0 ; i < this.cart.products.length ; i++) {
            try {
                this.cart.products[i].product = await productManager.getProduct(this.cart.products[i].id);
            } catch (error) {
                errorArray.push(`Le produit ${this.cart.products[i].name} n'existe pas / plus.`)
                this.cart.products.splice(i, 1);
                i--;
            }
        }

        return errorArray;
    }
}