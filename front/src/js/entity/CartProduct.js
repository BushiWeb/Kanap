/**
 * Class representing a product from the API.
 */
 export class CartProduct {
    /**
     * Construct the product.
     * @param {string} id - Product's ID.
     * @param {string} color - Product's color.
     * @param {number} quantity - Product's quantity.
     */
    constructor(id, color, quantity) {
        this._id = id;
        this._color = color;
        this._quantity = quantity;
    }


    /**
     * Add more product's quantity.
     * @param {number} quantity - Quantity to add.
     */
    addToQuantity(quantity) {
        this._quantity += quantity;
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
}