import { ProductApiDao } from "../dao/ProductApiDao";

/**
 * Class managing products data.
 */
export class ProductModel {
    /**
     * Create an instance of the ProductApiDao.
     * @param {Object | string} config - The configuration object or string, passed to the ProductApiDao.
     */
    constructor(config) {
        this.apiManager = new ProductApiDao(config);
    }


    /**
     * Fetch all the products.
     * @return {Array} An array containing all the products. If no data is returned, return an empty array.
     */
    async getAllProducts() {
        return await this.apiManager.getAllProducts();
    }


    /**
     * Fetch one product.
     * @param {string} productId - The id of the product to fetch.
     * @returns {Object} Return an object containing the product's data.
     */
    async getProduct(productId) {
        return await this.apiManager.getProduct(productId);
    }
}