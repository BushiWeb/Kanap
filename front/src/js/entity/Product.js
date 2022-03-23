/**
 * Class representing a product from the API.
 */
export class Product {
    /**
     * Construct the product.
     * @param {string} id - Product's ID.
     * @param {string} name - Product's name.
     * @param {number} price - Product's price.
     * @param {string} description - Product's description.
     * @param {string} imageSource - Associated image's URL.
     * @param {string} imageAltText - Alternative text of the associated image.
     * @param {string[]} colors - Array of available colors.
     */
    constructor(id, name, price, description, imageSource, imageAltText, colors) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._imageSource = imageSource;
        this._imageAltText = imageAltText;
        this._colors = [...colors];
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
     * _name property getter.
     * @return {string} Return the value of the _name property.
     */
    get name() {
        return this._name;
    }

    /**
     * _description property getter.
     * @return {string} Return the value of the _description property.
     */
    get description() {
        return this._description;
    }

    /**
     * _price property getter.
     * @return {string} Return the value of the _price property.
     */
    get price() {
        return this._price;
    }

    /**
     * _imageSource property getter.
     * @return {string} Return the value of the _imageSource property.
     */
    get imageSource() {
        return this._imageSource;
    }

    /**
     * _imageAltText property getter.
     * @return {string} Return the value of the _imageAltText property.
     */
    get imageAltText() {
        return this._imageAltText;
    }

    /**
     * _colors property getter.
     * @return {string} Return the value of the _colors property.
     */
    get colors() {
        return this._colors;
    }
}