import { CartView } from '../view/CartView';
import { ProductManagerFactory } from '../factories/ProductManagerFactory';
import { CartManagerFactory } from '../factories/CartManagerFactory';
import { CartManagerLocalStorage } from '../model/CartManagerLocalStorage';

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
        let errorMessage = (nameError.length === 0)? '' : ((nameError.length === 1)? `Le produit ${nameError[0]} n'existe pas/plus.` : `Les produits ${nameError.join(', ')} n'existent pas/plus.`);
        this.view.render(cartEntity, errorMessage);
    }


    /**
     * Call the view methods to update the totals.
     */
    updateTotals() {
        const currentCart = this.cartManager.getCart();
        this.view.insertTotals(currentCart.totalPrice, currentCart.totalQuantity);
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
}