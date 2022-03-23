import { ProductApiDao } from "../dao/ProductApiDao";

/**
 * Class managing products data.
 */
export class ProductManagerKanapApi {
    /**
     * Create an instance of the ProductApiDao. Create an empty array for the Product entities. Create the produtsListComplete property that indicates if all the products have already been fetched.
     * @param {Object | string} config - The configuration object or string, passed to the ProductApiDao.
     */
    constructor(config) {
        this.dao = new ProductApiDao(config);
        this.products = [];
        this.productsListComplete = false;
    }


    /**
     * Fetch all the products.
     * If all the products are stored in the products property, use those data.
     * If not all the products are stored in the products property, fetch the data from using the dao and update the products property.
     * @return {Array} An array containing all the products. If no data is returned, return an empty array.
     */
    async getAllProducts() {
        if (!this.productsListComplete) {
            this.products = await this.dao.getAllProducts();
            this.productsListComplete = true;
        }

        return this.products;
    }


    /**
     * Fetch one product.
     * If the product is stored in the products property, use those data.
     * If the product isn't in the products property, but all the products are in the property, throw an error.
     * If the product isn't in the products property but not all the products are stored, fetch the data from using the dao and update the products property.
     * @param {string} productId - The id of the product to fetch.
     * @returns {Object} Return an object containing the product's data.
     * @throws Throw an error if the product is not in the products property but all the products have already been fetched.
     */
    async getProduct(productId) {
        const productIndex = this.checkProduct(productId);
        if (productIndex === false) {
            if (this.productsListComplete) {
                throw new Error('Erreur : le produit demandé n\'existe pas');
            }

            const productData = await this.dao.getProduct(productId);
            this.products.push(productData);
            return productData;

        } else {
            return this.products[productIndex];
        }
    }


    /**
     * Check if the product is already in the products property and send back it's index.
     * @param {string} productId - Product's ID to search.
     * @return Return the index of the product. Return false if the product isn't in the list.
     */
    checkProduct(productId) {
        for (let i = 0 ; i < this.products.length ; i++) {
            if (this.products[i]._id === productId) {
                return i;
            }
        }

        return false;
    }
}