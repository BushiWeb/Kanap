/**
 * Manages the cart stored in the local storage.
 */
export class CartModel {
    /**
     * Sets up the cart name in the local storage
     */
    constructor() {
        this.storageName = 'kanapCart';
    }


    /**
     * Fetch the cart object from the localstorage.
     * @returns {Object.<id:string, color: string, quantity: number>[]} The parsed cart object. If no products are in the cart or if the cart doesn't exists, return an empty array.
     */
    getCart() {
        const cartObject = localStorage.getItem(this.storageName);
        if (!cartObject) {
            return [];
        }

        console.log(cartObject);

        return JSON.parse(cartObject);
    }


    /**
     * Creates or modifies the cart object in the local storage.
     * @param {Object.<id:string, color: string, quantity: number>[]} cartObject - The cart object
     */
    postCart(cartObject) {
        localStorage.setItem(this.storageName, JSON.stringify(cartObject));
    }


    /**
     * Adds a product to the cart object in the localStorage
     * @param {Object.<id:string, color: string, quantity: number>} productObject - An object containing the informations about the product
     */
    addProduct(productObject) {
        let cartObject = this.getCart();

        for (let i = 0 ; i < cartObject.length ; i++) {
            if (cartObject[i].id === productObject.id && cartObject[i].color === productObject.color) {
                cartObject[i].quantity += productObject.quantity;
                this.postCart(cartObject);
                return;
            }
        }

        cartObject.push(productObject);
        this.postCart(cartObject);
    }
}