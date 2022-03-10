import { HomeView } from '../view/HomeView';
import { ProductModel } from '../model/ProductModel';

/**
 * Entry point for the Home page: manages the loading of the page by fetching the data from the model and asking the view to render them.
 */
export class HomeControler {
    /**
     * Creates the view and the model
     * @param {Object} config - Configuration object to use. Defaults to null.
     */
    constructor(config = null) {
        this.view = new HomeView();
        this.model = new ProductModel(config);
    }

    /**
     * Activates when the Home page loads. Fetches the data and display them.
     */
    async initialize() {
        let productsData = await this.model.getAllProducts();
        this.view.render(productsData);
    }
}