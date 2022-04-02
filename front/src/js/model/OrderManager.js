import { Order } from '../entity/Order';

/**
 * Parent class for all Order managers.
 */
export class OrderManager {
    /**
     * Set up the entitiers and the dao.
     */
    constructor() {
        this.order = undefined;
        this.dao = undefined;
    }
}
