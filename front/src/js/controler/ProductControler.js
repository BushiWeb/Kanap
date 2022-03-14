import { ProductView } from '../view/ProductView';
import { ProductModel } from '../model/ProductModel';
import { UrlManager } from '../model/UrlManager';
import { CartModel } from '../model/CartModel';
import { FormValidator } from '../form/FormValidator';

/**
 * Entry point for the Product page:
 *  Manages the loading of the page by fetching the data from the model and asking the view to render them.
 *  Adds the event listeners.
 *  Handles the fired events.
 */
export class ProductControler {
    /**
     * Creates the view and the model
     * @param {Object | string} config - Configuration object or string to use.
     * @param {string} url - Optionnal parameter, URL of the page.
     */
    constructor(config, url = window.location.href) {
        this.view = new ProductView();
        this.productModel = new ProductModel(config);
        this.urlManager = new UrlManager(url);
    }

    /**
     * Activates when the Product page loads. Fetches the data and display them, then adds the event listeners.
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
     * Event handler: add to cart. Récupère les informations, les valide et les ajoute au panier si elles sont valides.
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
    }


    /**
     * Adds a product to the cart.
     * @param {{id:string, color: string, quantity: number}} productObject - An object containing the informations about the product
     */
    addProductToCart(productObject) {
        if (!this.cartModel) {
            this.cartModel = new CartModel();
        }

        this.cartModel.addProduct(productObject);
    }
}