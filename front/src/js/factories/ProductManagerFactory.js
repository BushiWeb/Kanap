import { ProductManagerKanapApi } from '../model/ProductManagerKanapApi';

/**
 * Class managing the instanciation of ProductManager. Allows for easy modification of the model.
 */
export class ProductManagerFactory {
    /**
     * Create an instance of product manager.
     * @param {string} dao - Data Access Object name to use.
     * @param {string | Object} config - The configuration object or string, passed to the Data Access Object.
     * @returns Return an instance of the right ProductManager.
     */
    static createProductManager(dao, config) {
        return this["createProductManager" + dao](config);
    }


    /**
     * Create an instance of ProductManagerKanapApi.
     * @param {string | Object} config - The configuration object or string, passed to the Data Access Object.
     * @returns Return an instance of ProductManagerKanapApi.
     */
    static createProductManagerKanapApi(config) {
        return new ProductManagerKanapApi(config);
    }
}