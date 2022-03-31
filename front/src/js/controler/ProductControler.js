import { ProductView } from '../view/ProductView';
import { ProductManagerFactory } from '../factories/ProductManagerFactory';
import { UrlManager } from '../routing/UrlManager';
import { CartManagerLocalStorage } from '../model/CartManagerLocalStorage';
import { FormValidator } from '../form/FormValidator';
import { CartManagerFactory } from '../factories/CartManagerFactory';

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
        this.productManager = ProductManagerFactory.createProductManager('KanapApi', config);
        this.cartManager = CartManagerFactory.createCartManager('LocalStorage');
        this.urlManager = new UrlManager();
    }

    /**
     * Activate when the Cart page loads.
     * Fetch the data and display them.
     * If an error occurs while fetching the data, display the error in a modal box (alert).
     * Add the event listeners on the page.
     */
    async initialize() {
        try {
            const productId = this.urlManager.getParameter('id');
            const productData = await this.productManager.getProduct(productId);
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
        let error = false;

        if (typeof FormValidator.validateFormField(colorElement, {
            required: true
        }) === 'string') {
            this.view.createFormFieldError(colorElement, 'Merci de choisir une couleur avant d\'ajouter votre produit au panier.');
            error = true;
        } else {
            this.view.deleteFormFieldError(colorElement);
        }

        if (typeof FormValidator.validateFormField(quantityElement, {
            required: true
        }) === 'string') {
            this.view.createFormFieldError(quantityElement, 'Merci de choisir une quantité de produit valide.');
            error = true;
        } else {
            this.view.deleteFormFieldError(quantityElement);
        }


        const productId = this.urlManager.getParameter('id');
        let productName;
        this.productManager.getProduct(productId).then((data) => {
            productName = data.name;
        }).catch((error) => {
            error = true;
        });



        if (error) {
            return;
        }

        this.addProductToCart({
            id: productId,
            name: productName,
            color: colorElement.value,
            quantity: parseInt(quantityElement.value)
        });

        this.view.displayNotification('Le produit a bien été ajouté au panier.')
    }


    /**
     * Add a product to the cart.
     * @param {{id:string, name: string, color: string, quantity: number}} productObject - The object containing the informations about the product
     */
    addProductToCart(productObject) {
        this.cartManager.addProduct(productObject);
    }
}