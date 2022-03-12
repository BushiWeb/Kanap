import { HomeView } from '../view/HomeView';
import { ProductModel } from '../model/ProductModel';

/**
 * Entry point for the Home page: manages the loading of the page by fetching the data from the model and asking the view to render them.
 */
export class HomeControler {
    /**
     * Creates the view and the model
     * @param {Object | string} config - Configuration object or string to use.
     */
    constructor(config) {
        this.view = new HomeView();
        this.model = new ProductModel(config);
    }

    /**
     * Activates when the Home page loads. Fetches the data and display them.
     * If an error occurs while fetching the data, alerts an error.
     */
    async initialize() {
        try {
            let productsData = await this.model.getAllProducts();
            this.view.render(productsData);
        } catch (error) {
            console.error(error);
            this.view.alert('Un problème a eu lieu lors de la récupération des produits, nous ne pouvons pas afficher le catalogue. Veuillez nous excuser pour le dérangement.');
        }
    }
}