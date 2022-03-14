import { ConfigManager } from "../config/ConfigManager";

/**
 * Class managing communication with the API
 */
export class ProductApiManager {
    /**
     * Get API URL from the configuration file.
     * @param {Object | string} config - The configuration object or string.
     */
    constructor(config) {
        const configuration = new ConfigManager(config);
        this.apiUrl = configuration.getApiUrl();
    }


    /**
     * Fetch all products from the API.
     * @return {Array} Return an array containing the data. If no data is returned from the API, return an empty array.
     * @throws Throw an error if the request fails or if the status is not ok.
     */
    async getAllProducts() {
        let response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error('Erreur HTTP ! statut : ' + response.status + ' ' + response.statusText);
        }
        let data = await response.json();
        if (!data) {
            data = [];
        }
        return data;
    }


    /**
     * Fetch one product from the API.
     * @param {string} productId - The id of the product.
     * @returns {Object} Return an object containing the data of the product.
     * @throws Throw an error if the request failsor if the status is not ok.
     */
    async getProduct(productId) {
        let fetchUrl = this.apiUrl;
        if (!/.+\/$/.test(fetchUrl)) {
            fetchUrl += '/';
        }
        fetchUrl += productId;

        let response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error('Erreur HTTP ! statut : ' + response.status + ' ' + response.statusText);
        }
        let data = await response.json();
        return data;
    }
}