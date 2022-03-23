import { HomeView } from '../view/HomeView';
import { ProductManagerFactory } from '../factories/ProductManagerFactory';

/**
 * Class representing the entry point of the home page.
 * Serve as a mediator between the data and the rendering.
 */
export class HomeControler {
    /**
     * Create the view and the model.
     * @param {Object | string} config - The configuration object or string to use.
     */
    constructor(config) {
        this.view = new HomeView();
        this.productManager = ProductManagerFactory.createProductManager(config);
    }

    /**
     * Activate when the Home page loads.
     * Fetch the data and display them.
     * If an error occurs while fetching the data, display the error in a modal box (alert).
     */
    async initialize() {
        try {
            let productsData = await this.productManager.getAllProducts();
            this.view.render(productsData);
        } catch (error) {
            console.error(error);
            this.view.alert('Un problème a eu lieu lors de la récupération des produits, nous ne pouvons pas afficher le catalogue. Veuillez nous excuser pour le dérangement.');
        }
    }
}