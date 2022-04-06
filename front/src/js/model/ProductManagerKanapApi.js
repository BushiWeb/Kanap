import { ProductApiDao } from '../dao/ProductApiDao';
import { Product } from '../entity/Product';
import { ProductManager } from './ProductManager';

/**
 * Class managing products data.
 */
export class ProductManagerKanapApi extends ProductManager {
    /**
     * Create an instance of the ProductApiDao. Call the parent constructor and set up the DAO.
     * @param {Object | string} config - The configuration object or string, passed to the ProductApiDao.
     */
    constructor(config) {
        super();
        this.dao = new ProductApiDao(config);
    }

    /**
     * Fetch all the products.
     * If all the products are stored in the products property, use those data.
     * If not all the products are stored in the products property, fetch the data from using the dao and update the products property.
     * @return {Array} An array containing all the products. If no data is returned, return an empty array.
     */
    async getAllProducts() {
        if (!this.productsListComplete) {
            this.saveProducts(await this.dao.getAllProducts(), true);
        }

        return this.products;
    }

    /**
     * Fetch one product.
     * If the product is stored in the products property, use those data.
     * If the product isn't in the products property, but all the products are in the property, throw an error.
     * If the product isn't in the products property but not all the products are stored, fetch the data from using the dao and update the products property.
     * @param {string} productId - The id of the product to fetch.
     * @returns {Product} Return the corresponding entity.
     * @throws Throw an error if the product is not in the products property but all the products have already been fetched.
     */
    async getProduct(productId) {
        let productIndex = this.checkProduct(productId);
        if (productIndex === false) {
            if (this.productsListComplete) {
                throw new Error("Erreur : le produit demandé n'existe pas");
            }

            const productData = await this.dao.getProduct(productId);
            let productSave = this.saveProducts([productData]);
            productIndex = productSave[0];
        }
        return this.products[productIndex];
    }

    /**
     * Fetch a list of products.
     * Use the getProduct() method to fetch each product individually. If getProduct() throws an error, catch it.
     * @param {string[]} productsIds - Array of products IDs.
     * @returns {Object} Return an array containing all the products entities. If getProduct() throws an error for one product, place an error message in the array in place of the entity.
     */
    async getProductsList(productsIds) {
        let returnedProducts = [];

        for (let productId of productsIds) {
            try {
                returnedProducts.push(await this.getProduct(productId));
            } catch (error) {
                returnedProducts.push(`Une erreur a eu lieue avec la récupération du produit ${productId}`);
            }
        }

        return returnedProducts;
    }

    /**
     * Check if the product is already in the products property and send back it's index.
     * @param {string} productId - Product's ID to search.
     * @return Return the index of the product. Return false if the product isn't in the list.
     */
    checkProduct(productId) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === productId) {
                return i;
            }
        }

        return false;
    }

    /**
     * Save products to the products property.
     * Checks that the product is not already saved.
     * @param {Object[]} productsList - List of products to save to the products property
     * @param {boolean} allProducts - Indicates if all the products off the API are given. If true, replace the product property, if false, simply push each product.
     * @returns {number[]} Return an array containing the index of the added products in the property.
     */
    saveProducts(productsList, allProducts = false) {
        const returnIndexList = [];

        if (allProducts) {
            this.products = [];
            this.productsListComplete = true;
        }

        for (let i = 0; i < productsList.length; i++) {
            const productCheck = this.checkProduct(productsList[i]._id);
            if (productCheck === false) {
                this.products.push(
                    new Product(
                        productsList[i]._id,
                        productsList[i].name,
                        productsList[i].price,
                        productsList[i].description,
                        productsList[i].imageUrl,
                        productsList[i].altTxt,
                        productsList[i].colors
                    )
                );
                returnIndexList.push(this.products.length - 1);
            } else {
                returnIndexList.push(productCheck);
            }
        }

        return returnIndexList;
    }
}
