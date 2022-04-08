import { View } from './View';

/**
 * Class managing the rendering and the interactions with the content of the confirmation page.
 * @extends View
 */
export class ConfirmationView extends View {
    /**
     * Render the dynamic content of the product page.
     * Insert the order ID in the page.
     * @param {string} orderId - The order ID.
     */
    render(orderId) {
        const orderIdElement = this.getElements('#orderId')[0];
        orderIdElement.textContent = orderId;
    }
}
