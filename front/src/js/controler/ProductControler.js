import { ProductView } from '../view/ProductView';
import { ProductModel } from '../model/ProductModel';
import { UrlManager } from '../model/UrlManager';
import { CartModel } from '../model/CartModel';
import { FormValidator } from '../form/FormValidator';

/**
 * Class representing the entry point of the home page.
 * Serve as a mediator between the data and the rendering.
 * Manage the events fired from the page by providing the event handlers.
 */
export class ProductControler {
    /**
     * Create the view and the model
     * @param {Object | string} config - Configuration object or string to use.
     */
    constructor(config) {
        this.view = new ProductView();
        this.productModel = new ProductModel(config);
        this.urlManager = new UrlManager();
    }

    /**
     * Activate when the Home page loads.
     * Fetch the data and display them.
     * If an error occurs while fetching the data, display the error in a modal box (alert).
     * Add the event listeners on the page.
     */
    async initialize() {
        try {
            this.productId = this.urlManager.getParameter('id');
            const productData = await this.productModel.getProduct(this.productId);
            this.view.render(productData);
            this.view.addAddToCartEventListener(this.addToCartEventHandler.bind(this));
        } catch (error) {
            console.error(error);
            this.view.alert('Un problème a eu lieu lors de la récupération des informations sur le produit. Veuillez nous excuser pour le dérangement.');
        }
    }


    /**
     * Event handler for the "Add to cart event".
     * Get the product informations from the page, validate those data and add them to the cart.
     * @param {Event} event - The event object
     */
    addToCartEventHandler(event) {
        let colorElement = this.view.getColor();
        let quantityElement = this.view.getQuantity();
        let errorMessage = '';

        if (typeof FormValidator.validateFormField(colorElement, {
            required: true
        }) === 'string') {
            errorMessage = 'Merci de choisir une couleur avant d\'ajouter votre produit au panier.';
        }

        if (typeof FormValidator.validateFormField(quantityElement, {
            required: true
        }) === 'string') {
            if (errorMessage) {
                errorMessage += '\n';
            }
            errorMessage += 'Merci de choisir une quantité de produit valide.'
        }

        if (errorMessage) {
            this.view.alert(errorMessage);
            return;
        }

        this.addProductToCart({
            id: this.productId,
            color: colorElement.value,
            quantity: parseInt(quantityElement.value)
        });

        this.view.alert('Le produit a bien été ajouté au panier.')
    }


    /**
     * Add a product to the cart.
     * @param {{id:string, color: string, quantity: number}} productObject - The object containing the informations about the product
     */
    addProductToCart(productObject) {
        if (!this.cartModel) {
            this.cartModel = new CartModel();
        }

        this.cartModel.addProduct(productObject);
    }
}