import { ConfigManager } from '../config/ConfigManager';

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
     * Manage response errors.
     * @param {string} apiRoute - request's route to append to the URL. Defaults to no route.
     * @param {boolean} post - Boolean indicating if we use the POST method.
     * @param {Object} data - Data to send if we use the post method.
     * @return {Object} Return the request response data, in JSON format.
     * @throws Throw an arror if the request fails or if the status is not ok.
     */
    async sendRequest(apiRoute = '', post = false, data = undefined) {
        const requestUrl = /.+\/$/.test(this.apiUrl) ? this.apiUrl + apiRoute : this.apiUrl + '/' + apiRoute;
        let response;
        if (post) {
            response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } else {
            response = await fetch(requestUrl);
        }
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

    /**
     * Send an order to the API.
     * @param {{contact: {firstName: string, lastName: string, address: string, city: string, email: string}, products: string[]}} orderData - The order's data.
     * @returns {{contact: {firstName: string, lastName: string, address: string, city: string, email: string}, products: Object[], orderId: string}} Return an object containing the data of the order, including the order id and the ordered products.
     * @throws Throw an error if the data don't have the right format.
     */
    async sendOrder(orderData) {
        if (
            orderData.contact.firstName === undefined ||
            orderData.contact.lastName === undefined ||
            orderData.contact.address === undefined ||
            orderData.contact.city === undefined ||
            orderData.contact.email === undefined ||
            orderData.products === undefined
        ) {
            throw new Error('Erreur: les données envoyées ne sont pas au bon format.');
        }

        let data = await this.sendRequest('order', true, orderData);
        return data;
    }
}
