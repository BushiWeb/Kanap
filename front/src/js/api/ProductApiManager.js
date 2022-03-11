import { ConfigManager } from "../config/ConfigManager";

/**
 * Class managing communication with the API
 */
export class ProductApiManager {
    /**
     * Constructor, get API URL from the configuration file
     * @param {Object} config - Optionnal configuration object
     */
    constructor(config) {
        let configuration;
        if (config) {
            configuration = new ConfigManager(config);
        } else {
            configuration = new ConfigManager();
        }

        this.apiUrl = configuration.getApiUrl();
    }


    /**
     * Fetch all products from the API
     * @returns {Array} Return an array containing the data. If no data is returned from the API, return an empty array.
     * @throws Error if the request fails
     */
    async getAllProducts() {
        try {
            let response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP ! statut : ' + response.status + ' ' + response.statusText);
            }
            let data = await response.json();
            if (!data) {
                data = [];
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * Fetch one product from the API, given it's Id
     * @param {string} productId - Id of the product
     * @returns {Object} Return an object containing the data of the product
     * @throws Error if the request fails
     */
    async getProduct(productId) {
        let fetchUrl = this.apiUrl;
        if (!/.+\/$/.test(fetchUrl)) {
            fetchUrl += '/';
        }
        fetchUrl += productId;

        try {
            let response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP ! statut : ' + response.status + ' ' + response.statusText);
            }
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}