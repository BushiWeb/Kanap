import { ProductView } from '../view/ProductView';
import { ProductModel } from '../model/ProductModel';
import { UrlManager } from '../model/UrlManager';

/**
 * Entry point for the Product page:
 *  Manages the loading of the page by fetching the data from the model and asking the view to render them.
 *  Adds the event listeners.
 *  Handles the fired events.
 */
export class ProductControler {
    /**
     * Creates the view and the model
     * @param {Object} config - Configuration object to use. Defaults to null.
     * @param {string} url - Optionnal parameter, URL of the page.
     */
    constructor(config = null, url = window.location.href) {
        this.view = new ProductView();
        this.model = new ProductModel(config);
        this.urlManager = new UrlManager(url);
    }

    /**
     * Activates when the Product page loads. Fetches the data and display them, then adds the event listeners.
     */
    async initialize() {
        const productId = this.urlManager.getParameter('id');
        const productData = await this.model.getProduct(productId);
        this.view.render(productData);
    }
}