import { OrderManager } from '../model/OrderManager';
import { OrderManagerKanapApi } from '../model/OrderManagerKanapApi';

/**
 * Class managing the instanciation of ProductManager. Allows for easy modification of the model.
 */
export class OrderManagerFactory {
    /**
     * Create an instance of order manager.
     * @param {string} dao - Data Access Object name to use.
     * @param {string | Object} config - The configuration object or string, passed to the Data Access Object.
     * @returns {OrderManager} Return an instance of the right OrderManager.
     */
    static createOrderManager(dao, config) {
        return this['createOrderManager' + dao](config);
    }

    /**
     * Create an instance of OrderManagerKanapApi.
     * @param {string | Object} config - The configuration object or string, passed to the Data Access Object.
     * @returns {OrderManagerKanapApi} Return an instance of OrderManagerKanapApi.
     */
    static createOrderManagerKanapApi(config) {
        return new OrderManagerKanapApi(config);
    }
}
