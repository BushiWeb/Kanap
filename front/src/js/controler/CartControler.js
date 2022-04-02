import { CartView } from '../view/CartView';
import { ProductManagerFactory } from '../factories/ProductManagerFactory';
import { CartManagerFactory } from '../factories/CartManagerFactory';
import { CartManagerLocalStorage } from '../model/CartManagerLocalStorage';
import { FormValidator } from '../form/FormValidator';

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
}
