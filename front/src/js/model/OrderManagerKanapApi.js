import { Order } from '../entity/Order';
import { OrderManager } from './OrderManager';
import { ProductApiDao } from '../dao/ProductApiDao';

/**
 * Class managing the orders, sent to the Kanap API.
 */
export class OrderManagerKanapApi extends OrderManager {
    /**
     * Call the parent constructor.
     * Set up the DAO.
     * @param {Object | string} config - Configuration to give to the DAO.
     */
    constructor(config) {
        super();
        this.dao = new ProductApiDao(config);
    }
}
