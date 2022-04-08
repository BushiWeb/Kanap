import { ConfirmationView } from '../view/ConfirmationView';
import { UrlManager } from '../routing/UrlManager';

/**
 * Class representing the entry point of the confirmation page.
 * Serve as a mediator between the data and the rendering.
 */
export class ConfirmationControler {
    /**
     * Create the view and the urlManager.
     */
    constructor() {
        this.view = new ConfirmationView();
        this.urlManager = new UrlManager();
    }

    /**
     * Activate when the Confirmation page loads.
     * Fetch the data and display them.
     * If an error occurs while fetching the data, display the error in a modal box (alert).
     */
    initialize() {
        try {
            const orderId = this.urlManager.getParameter('orderId');
            this.view.render(orderId);
        } catch (error) {
            console.error(error);
            this.view.alert(
                'Un problème a eu lieu lors de la récupération des informations sur la commande. Veuillez nous excuser pour le dérangement.'
            );
        }
    }
}
