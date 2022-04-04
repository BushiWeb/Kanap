import { CartView } from '../view/CartView';
import { ProductManagerFactory } from '../factories/ProductManagerFactory';
import { CartManagerFactory } from '../factories/CartManagerFactory';
import { CartManagerLocalStorage } from '../model/CartManagerLocalStorage';
import { OrderManagerFactory } from '../factories/OrderManagerFactory';
import { OrderManagerKanapApi } from '../model/OrderManagerKanapApi';
import { FormValidator } from '../form/FormValidator';
import { Order } from '../entity/Order';
import { UrlManager } from '../routing/UrlManager';

/**
 * Class representing the entry point of the cart page.
 * Serve as a mediator between the data and the rendering.
 * Manage the events fired from the page by providing the event handlers.
 */
export class CartControler {
    /**
     * Create the view and the model
     * @param {Object | string} config - Configuration object or string to use.
     */
    constructor(config) {
        this.view = new CartView();
        this.productManager = ProductManagerFactory.createProductManager('KanapApi', config);
        this.cartManager = CartManagerFactory.createCartManager('LocalStorage');
        this.orderManager = OrderManagerFactory.createOrderManager('KanapApi', config);
    }

    /**
     * Activate when the Cart page loads.
     * Get the cart data from the localStorage and associate them with products data.
     * Add the event listeners on the page.
     */
    async initialize() {
        const cartEntity = this.cartManager.getCart();
        const nameError = await this.cartManager.setCartProductProductInfos(this.productManager);
        let errorMessage =
            nameError.length === 0
                ? ''
                : nameError.length === 1
                ? `Le produit ${nameError[0]} n'existe pas/plus.`
                : `Les produits ${nameError.join(', ')} n'existent pas/plus.`;
        this.view.render(cartEntity, errorMessage);
        this.view.addDeleteProductEventListener(this.deleteProductEventHandler.bind(this));
        this.view.addUpdateProductQuantityEventListener(this.updateProductQuantityEventHandler.bind(this));
        this.view.addSubmitOrderFormEventListener(this.submitOrderEventHandler.bind(this));
    }

    /**
     * Call the view methods to update the totals.
     */
    updateTotals() {
        const currentCart = this.cartManager.getCart();
        this.view.insertTotals(currentCart.totalPrice, currentCart.totalQuantity);
    }

    /**
     * Event handler for the "Delete product from cart" event.
     * Get the product informations from the page, delete the product from the cart.
     * @param {Event} event - The event object
     */
    deleteProductEventHandler(event) {
        const productCartElement = event.target.closest('[data-id][data-color]');
        if (productCartElement !== null) {
            this.deleteProductFromCart(productCartElement.dataset.id, productCartElement.dataset.color);
        }
    }

    /**
     * Delete a product from the cart.
     * Remove the product's cart from the DOM.
     * @param {string} id - ID of the product to delete.
     * @param {string} color - Color of the product to delete.
     */
    deleteProductFromCart(id, color) {
        this.cartManager.deleteProduct(id, color);
        this.view.removeProductFromDom(id, color);
        this.updateTotals();
    }

    /**
     * Event handler for the "update product's quantity" event.
     * @param {Event} event - The event object.
     */
    updateProductQuantityEventHandler(event) {
        if (typeof FormValidator.validateFormField(event.target, { required: true }) === 'string') {
            this.view.createFormFieldError(
                event.target,
                'Merci de choisir une quantité de produit valide, entre ' +
                    event.target.getAttribute('min') +
                    ' et ' +
                    event.target.getAttribute('max') +
                    '.'
            );
            return;
        }

        this.view.deleteFormFieldError(event.target);

        const productCartElement = event.target.closest('[data-id][data-color]');
        if (productCartElement !== null) {
            this.updateProductQuantity(
                productCartElement.dataset.id,
                productCartElement.dataset.color,
                parseInt(event.target.value)
            );
        }
    }

    /**
     * Change the quantity of a product in the cart.
     * Update the totals on the page.
     * If the quantity is 0, delete the product.
     * @param {string} id - ID of the product to update
     * @param {string} color - Color of the product to update
     * @param {number} quantity - New quantity of product
     */
    updateProductQuantity(id, color, quantity) {
        if (quantity <= 0) {
            this.deleteProductFromCart(id, color);
            return;
        }

        this.cartManager.updateProductQuantity(id, color, quantity);
        this.updateTotals();
    }

    /**
     * Event handler for the "submit order" event.
     * Validates the form and send it.
     * @param {Event} event - The event object.
     */
    submitOrderEventHandler(event) {
        event.preventDefault();

        const validationResult = FormValidator.validateForm(event.target);
        if (!validationResult.valid) {
            this.view.displayContactFormError(validationResult.fields);
            return;
        }

        let fields = event.target.elements;

        let contactData = {
            firstName: fields['firstName'].value,
            lastName: fields['lastName'].value,
            address: fields['address'].value,
            city: fields['city'].value,
            email: fields['email'].value,
        };
        let productsData = [];
        for (let product of this.cartManager.getCart().products) {
            productsData.push(product.id);
        }

        this.submitOrder(contactData, productsData);

        this.cartManager.resetCart();
    }

    /**
     * Send an order to the API and redirect to the confirmation page.
     * @param {{firstName: string, lastName: string, address: string, city: string, email: string}} contactData - Data of the contact form.
     * @param {string[]} productsData - Ids of the ordered products.
     */
    async submitOrder(contactData, productsData) {
        try {
            const orderEntity = await this.orderManager.sendOrder({
                contact: contactData,
                products: productsData,
            });

            let newUrl = window.location.href.replace(/cart\.html/, 'confirmation.html');

            const urlManager = new UrlManager(newUrl, { orderId: orderEntity.orderId });

            urlManager.redirect();
        } catch (error) {
            console.error(error);
            this.view.alert("Un problème est survenu lors de l'envoi des données. Veuillez réessayer.");
        }
    }
}
