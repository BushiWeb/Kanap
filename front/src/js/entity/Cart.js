import { CartProduct } from "./CartProduct";

/**
 * Class representing a product from the API.
 */
export class Cart {
    /**
     * Construct the cart.
     * @param {CartProduct[]} products - Products in the cart.
     */
    constructor(products = []) {
        this.products = products;
    }


    /**
     * Add a product to the cart.
     * If the product is already in the cart (same id and same color), updates the quantity of the product.
     * @param {{id: string, color: string, quantity: number}} product - Product to add to the cart.
     */
    addProduct(product) {
        const cartProduct = new CartProduct(product.id, product.color, product.quantity);
        const productIndex = this.searchProduct(cartProduct);

        if (productIndex === false) {
            this._products.push(cartProduct);
        } else {
            this._products[productIndex].addToQuantity(cartProduct.quantity);
        }
    }


    /**
     * Check if the product is already in the cart (same id and same color).
     * @param {CartProduct} product - Product to check.
     * @return Return false if the product is not in the cart, it's index otherwise
     */
    searchProduct(product) {
        for (let i = 0 ; i < this._products.length ; i++) {
            if (this._products[i].color === product.color && this._products[i].id === product.id) {
                return i;
            }
        }

        return false;
    }


    /**
     * Create an array of litteral objects of the products.
     * @return {{id: string, color: string, quantity: number}[]} Array containing the objects representing the products
     */
    getData() {
        const dataResult = [];
        for (const cartProduct of this._products) {
            dataResult.push(cartProduct.getData());
        }
        return dataResult;
    }


    /********************************************
     * GETTERS
     ********************************************/
    /**
     * Return all the products from the cart.
     * @return {CartProduct[]} Return an array of cart products.
     */
    get products() {
        return this._products;
    }


    /********************************************
     * SETTERS
     ********************************************/
    /**
     * Set the cart content
     * @param {Cartproducts[]} products - Products in the cart.
     */
     set products(products) {
        this._products = products;
    }
}