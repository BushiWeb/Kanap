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
        this._totalPrice = undefined;
        this._totalQuantity = undefined;
    }


    /**
     * Add a product to the cart.
     * If the product is already in the cart (same id and same color), updates the quantity of the product.
     * @param {CartProduct} product - Product to add to the cart.
     */
    addProduct(product) {
        const productIndex = this.searchProduct(product);

        if (productIndex === false) {
            this._products.push(product);
        } else {
            this._products[productIndex].addToQuantity(product.quantity);
        }

        this.updateTotals();
    }


    /**
     * Check if the product is already in the cart (same id and same color).
     * @param {CartProduct} product - Product to check.
     * @return Return false if the product is not in the cart, it's index otherwise
     */
    searchProduct(product) {
        for (let i = 0 ; i < this._products.length ; i++) {
            if (this.products[i].compare(product)) {
                return i;
            }
        }

        return false;
    }


    /**
     * Delete a CartProduct from the list.
     * @param {CartProduct} product - Product to delete.
     */
    deleteProduct(product) {
        let productIndex = this.searchProduct(product);

        if (productIndex === false) {
            return false;
        }

        this.products.splice(productIndex, 1);
        this.updateTotals();
        return true;
    }


    /**
     * Update the _totalPrice value. If the price of one CartProduct is undefined, set _totalPrice to undefined.
     */
    updateTotalPrice() {
        let totalPrice = 0;

        for (let cartProduct of this.products) {
            if (cartProduct.product === undefined) {
                totalPrice = undefined;
                break;
            }
            totalPrice += cartProduct.quantity * cartProduct.product.price;
        }

        this._totalPrice = totalPrice;
    }


    /**
     * Update the _totalQuantity value.
     */
    updateTotalQuantity() {
        let totalQuantity = 0;

        for (let cartProduct of this.products) {
            totalQuantity += cartProduct.quantity;
        }

        this._totalQuantity = totalQuantity;
    }


    /**
     * Update the _totalQuantity and the _totalPrice values.
     */
    updateTotals() {
        this.updateTotalPrice();
        this.updateTotalQuantity();
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

    /**
     * Return the total price.
     * @return {number} Return _totalPrice.
     */
    get totalPrice() {
        if (this._totalPrice === undefined) {
            this.updateTotalPrice();
        }
        return this._totalPrice;
    }

    /**
     * Return the total quantity.
     * @return {number} Return _totalQuantity.
     */
    get totalQuantity() {
        if (this._totalQuantity === undefined) {
            this.updateTotalQuantity();
        }
        return this._totalQuantity;
    }


    /********************************************
     * SETTERS
     ********************************************/
    /**
     * Set the cart content
     * @param {CartProduct[]} products - Products in the cart.
     */
     set products(products) {
        this._products = products;
    }
}