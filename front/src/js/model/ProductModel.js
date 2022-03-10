import { ProductApiManager } from "../api/ProductApiManager";

/**
 * Class managing products data
 */
export class ProductModel {
    /**
     * Create an instance of the ProductApiManager
     * @param {Object} config - Configuration object, passed to the ProductApiManager. Optionnal
     */
    constructor(config = null) {
        this.apiManager = new ProductApiManager(config);
    }

    /**
     * Fetch all products using the ProductApiManager
     * @returns {Array} Array containing all the products. If no data is returned, return an empty array.
     */
    async getAllProducts() {
        return await this.apiManager.getAllProducts();
    }
}