import { Cart } from '../entity/Cart';
import { LocalStorageDao } from '../dao/LocalStorageDao';
import { CartManager } from './CartManager';
import { CartProduct } from '../entity/CartProduct';

/**
 * Class managing the cart, stored in the local storage.
 */
export class CartManagerLocalStorage extends CartManager {
    /**
     * Call the parent constructor.
     * Set up the key of the cart in the localStorage.
     * Set up the DAO.
     */
    constructor() {
        super();
        this.storageName = 'cart';
        this.dao = new LocalStorageDao();
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
        let cartProducts = [];
        if (daoData === undefined) {
            daoData = [];
        }

        for (let i = 0 ; i < daoData.length ; i++) {
            cartProducts.push(new CartProduct(daoData[i].id, daoData[i].color, daoData[i].quantity));
        }

        this.cart = new Cart(cartProducts);
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