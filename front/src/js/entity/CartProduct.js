import { Product } from './Product';

/**
 * Class representing a product from the API.
 */
export class CartProduct {
    /**
     * Construct the product.
     * @param {string} id - Product's ID.
     * @param {string} color - Product's color.
     * @param {number} quantity - Product's quantity.
     * @param {string} name - Product's name.
     * @param {Product} product - Associated product entity. Defaults to undefined.
     */
    constructor(id, color, quantity, name, product = undefined) {
        this._id = id;
        this._color = color;
        this._quantity = quantity;
        this._name = name;
        this._product = product;
    }

    /**
     * Add more product's quantity.
     * @param {number} quantity - Quantity to add.
     */
    addToQuantity(quantity) {
        this._quantity += quantity;
    }

    /**
     * Compare the current CartProduct with another one. Two products are identical if they have the same ID and the same color.
     * @param {CartProduct} cartProduct - Cart product to check.
     * @return {boolean} Return true if the given product is the same as the current product, return false otherwie.
     */
    compare(cartProduct) {
        return cartProduct.id === this.id && cartProduct.color === this.color;
    }

    /********************************************
     * GETTERS
     ********************************************/
    /**
     * _id property getter.
     * @return {string} Return the value of the _id property.
     */
    get id() {
        return this._id;
    }

    /**
     * _color property getter.
     * @return {string} Return the value of the _color property.
     */
    get color() {
        return this._color;
    }

    /**
     * _quantity property getter.
     * @return {number} Return the value of the _quantity property.
     */
    get quantity() {
        return this._quantity;
    }

    /**
     * _name property getter.
     * @return {number} Return the value of the _name property.
     */
    get name() {
        return this._name;
    }

    /**
     * _product property getter.
     * @return {Product} Return the value of the _product property.
     */
    get product() {
        return this._product;
    }

    /********************************************
     * SETTERS
     ********************************************/
    /**
     * _quantity property setter.
     * @param {number} quantity - The new product's quantity.
     */
    set quantity(quantity) {
        this._quantity = quantity;
    }

    /**
     * _product property setter.
     * @param {Product} product - The new product's entity.
     */
    set product(product) {
        this._product = product;
    }
}
