import { Contact } from './Contact';

/**
 * Class representing an order
 */
export class Order {
    /**
     * Construct the order.
     * @param {Contact} contact - Contact ordering.
     * @param {string[]} productIds - IDs of ordered products.
     */
    constructor(contact, productIds) {
        this._contact = contact;
        this._productIds = [...productIds];
        this._orderId = undefined;
    }

    /********************************************
     * GETTERS
     ********************************************/
    /**
     * _contact property getter.
     * @return {string} Return the value of the _contact property.
     */
    get contact() {
        return this._contact;
    }

    /**
     * _productIds property getter.
     * @return {string} Return the value of the _productIds property.
     */
    get productIds() {
        return this._productIds;
    }

    /**
     * _orderId property getter.
     * @return {string} Return the value of the _orderId property.
     */
    get orderId() {
        return this._orderId;
    }

    /********************************************
     * SETTERS
     ********************************************/
    /**
     * _orderId property setter.
     * @param {string} orderId - New value of _orderId.
     */
    set orderId(orderId) {
        this._orderId = orderId;
    }
}
