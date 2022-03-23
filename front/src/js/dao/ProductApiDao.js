import { ConfigManager } from "../config/ConfigManager";

/**
 * Class managing communication with the API
 */
export class ProductApiDao {
    /**
     * Get API URL from the configuration file.
     * @param {Object | string} config - The configuration object or string.
     */
    constructor(config) {
        const configuration = new ConfigManager(config);
        this.apiUrl = configuration.getApiUrl();
    }


    /**
     * Send a request to the API.
     * @param {string} apiRoute - request's route to append to the URL. Defaults to no route.
     * @return {Object} Return the request response data, in JSON format.
     * @throws Throw an arror if the request fails or if the status is not ok.
     */
    async sendRequest(apiRoute = '') {
        const requestUrl = (/.+\/$/.test(this.apiUrl))? this.apiUrl + apiRoute : this.apiUrl + '/' + apiRoute;

        let response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error('Erreur HTTP ! statut : ' + response.status + ' ' + response.statusText);
        }

        return await response.json();
    }


    /**
     * Fetch all products from the API.
     * @return {Array} Return an array containing the data. If no data is returned from the API, return an empty array.
     */
    async getAllProducts() {
        let data = await this.sendRequest();
        if (!data) {
            data = [];
        }
        return data;
    }


    /**
     * Fetch one product from the API.
     * @param {string} productId - The id of the product.
     * @returns {Object} Return an object containing the data of the product.
     */
    async getProduct(productId) {
        let data = await this.sendRequest(productId);
        return data;
    }
}