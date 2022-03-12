import { ProductApiManager } from "../api/ProductApiManager";

/**
 * Class managing products data
 */
export class ProductModel {
    /**
     * Create an instance of the ProductApiManager
     * @param {Object | string} config - Configuration object o string, passed to the ProductApiManager.
     */
    constructor(config) {
        this.apiManager = new ProductApiManager(config);
    }


    /**
     * Fetch all products using the ProductApiManager
     * @returns {Array} Array containing all the products. If no data is returned, return an empty array.
     */
    async getAllProducts() {
        return await this.apiManager.getAllProducts();
    }


    /**
     * Fetch the product with a given id using the ProductApiManager
     * @param {string} productId - Id of the product to fetch
     * @returns {Object} Object containing the data of the product
     */
    async getProduct(productId) {
        return await this.apiManager.getProduct(productId);
    }
}