import { Order } from '../entity/Order';
import { OrderManager } from './OrderManager';
import { ProductApiDao } from '../dao/ProductApiDao';
import { Contact } from '../entity/Contact';

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

    /**
     * Send an order and update the order with the received data.
     * @param {{contact: {firstName: string, lastName: string, address: string, city: string, email: string}, products: string[]}} data - The order's data.
     * @return {Order} Return the updated order entity.
     */
    async sendOrder(data) {
        const returnedOrderData = await this.dao.sendOrder(data);
        this.order = new Order(
            new Contact(
                returnedOrderData.contact.firstName,
                returnedOrderData.contact.lastName,
                returnedOrderData.contact.address,
                returnedOrderData.contact.city,
                returnedOrderData.contact.email
            ),
            returnedOrderData.products,
            returnedOrderData.orderId
        );
        return this.order;
    }
}
