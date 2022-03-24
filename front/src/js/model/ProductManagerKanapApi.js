import { ProductApiDao } from "../dao/ProductApiDao";
import { Product } from "../entity/Product";

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
     * @returns {Object} Return an object containing the product's data.
     * @throws Throw an error if the product is not in the products property but all the products have already been fetched.
     */
    async getProduct(productId) {
        let productIndex = this.checkProduct(productId);
        if (productIndex === false) {
            if (this.productsListComplete) {
                throw new Error('Erreur : le produit demandé n\'existe pas');
            }

            const productData = await this.dao.getProduct(productId);
            let productSave = this.saveProducts([productData]);
            productIndex = productSave[0];

        }
        return this.products[productIndex];
    }


    /**
     * Check if the product is already in the products property and send back it's index.
     * @param {string} productId - Product's ID to search.
     * @return Return the index of the product. Return false if the product isn't in the list.
     */
    checkProduct(productId) {
        for (let i = 0 ; i < this.products.length ; i++) {
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

        for (let i = 0 ; i < productsList.length ; i++) {
            const productCheck = this.checkProduct(productsList[i]._id)
            if (productCheck === false) {
                this.products.push(new Product(
                    productsList[i]._id,
                    productsList[i].name,
                    productsList[i].price,
                    productsList[i].description,
                    productsList[i].imageUrl,
                    productsList[i].altTxt,
                    productsList[i].colors
                    ));
                returnIndexList.push(this.products.length - 1);
            } else {
                returnIndexList.push(productCheck);
            }
        }

        return returnIndexList;
    }
}