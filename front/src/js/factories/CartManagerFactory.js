import { CartManagerLocalStorage } from '../model/CartManagerLocalStorage';

/**
 * Class managing the instanciation of ProductManager. Allows for easy modification of the model.
 */
export class CartManagerFactory {
    /**
     * Create an instance of cart manager.
     * @param {string} dao - Data Access Object name to use.
     * @returns Return an instance of the right CartManager.
     */
    static createCartManager(dao) {
        return this["createCartManager" + dao]();
    }


    /**
     * Create an instance of CartManagerLocalStorage.
     * @returns Return an instance of CartManagerLocalStorage.
     */
    static createCartManagerLocalStorage() {
        return new CartManagerLocalStorage();
    }
}