/**
 * Class managing the cart, stored in the local storage.
 */
export class CartManagerLocalStorage {
    /**
     * Set up the key of the cart in the localStorage.
     */
    constructor() {
        this.storageName = 'kanapCart';
    }


    /**
     * Fetch the cart object from the localStorage.
     * @return {{id:string, color: string, quantity: number}[]} Return the parsed cart object. If no products are in the cart or if the cart doesn't exist, return an empty array.
     */
    getCart() {
        const cartObject = localStorage.getItem(this.storageName);
        if (!cartObject) {
            return [];
        }

        return JSON.parse(cartObject);
    }


    /**
     * Create or modify the cart object in the localStorage.
     * @param {{id:string, color: string, quantity: number}[]} cartObject - The cart object.
     */
    postCart(cartObject) {
        localStorage.setItem(this.storageName, JSON.stringify(cartObject));
    }


    /**
     * Add a product to the cart object.
     * @param {{id:string, color: string, quantity: number}} productObject - An object containing the informations about the product.
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