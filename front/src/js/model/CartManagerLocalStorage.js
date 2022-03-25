import { Cart } from '../entity/Cart';
import { LocalStorageDao } from '../dao/LocalStorageDao';

/**
 * Class managing the cart, stored in the local storage.
 */
export class CartManagerLocalStorage {
    /**
     * Set up the key of the cart in the localStorage.
     * Set up the DAO.
     * Set up the entities and the boolean indicating if the cart is complete.
     */
    constructor() {
        this.storageName = 'cart';
        this.dao = new LocalStorageDao();
        this.cart = new Cart();
        this.cartComplete = false;
    }


    /**
     * Return the cart's data. If the property is empty and the cart is incomplete, fetches the data from the localStorage and saves them.
     * @return {Cart} Return the cart entity.
     */
    getCart() {
        if (this.cartComplete) {
            return this.cart;
        }

        let daoData = this.dao.getData(this.storageName, true);
        this.cartComplete = true;
        if (daoData === undefined) {
            daoData = [];
        }
        this.cart = new Cart(daoData);
        return this.cart;
    }


    /**
     * Create or modify the cart object in the localStorage.
     */
    postCart() {
        this.dao.setData(this.storageName, this.cart.getData());
    }


    /**
     * Add a product to the cart object.
     * @param {{id:string, color: string, quantity: number}} productObject - An object containing the informations about the product.
     */
    addProduct(productObject) {
        this.getCart();

        this.cart.addProduct(productObject);

        this.postCart();
    }
}