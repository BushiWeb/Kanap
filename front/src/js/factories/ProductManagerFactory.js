import { ProductManager } from '../model/ProductManager';

/**
 * Class managing the instanciation of ProductManager. Allows for easy modification of the model.
 */
export class ProductManagerFactory {
    /**
     * Create an instance of product manager.
     * @param {string | Object} config - The configuration object or string, passed to the Data Access Object.
     * @returns Return an instance of the right ProductManager.
     */
    static createProductManager(config) {
        return new ProductManager(config);
    }
}