import { View } from "./View";

/**
 * Class managing the rendering and the interactions with the content of the product page.
 * @extends View
 */
export class ProductView extends View {
    /**
     * Render the dynamic content of the product page.
     * Insert the products informations in the page.
     * Add the event listeners.
     * @param {Product[]} product - The object containing the product's data.
     */
    render(product) {
        const imageContainerElement = this.getElements('.item__img')[0];
        const titleContainerElement = this.getElements('#title')[0];
        const priceContainerElement = this.getElements('#price')[0];
        const descriptionContainerElement = this.getElements('#description')[0];
        const selectColorsElement = this.getElements('#colors')[0];

        const imageElement = this.createElement('img', {
            src: product.imageSource,
            alt: product.imageAltText
        });
        imageContainerElement.appendChild(imageElement);

        titleContainerElement.textContent = product.name;

        priceContainerElement.textContent = product.price;

        descriptionContainerElement.textContent = product.description;

        for (const color of product.colors) {
            const optionElt = this.createElement('option', {
                value: color
            });
            optionElt.textContent = color;
            selectColorsElement.appendChild(optionElt);
        }
    }


    /**
     * Create an event listener for the "add to cart" button.
     * @param {Function} callback - The function to call when the event fires.
     */
    addAddToCartEventListener(callback) {
        const addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', callback);
    }


    /**
     * Send the color selection element back.
     * @return{HTMLSelectElement} Return the color select element.
     */
    getColor() {
        return this.getElements('#colors')[0];
    }


    /**
     * Send the quantity selector back.
     * @return {HTMLInputElement} Return the quantity input element.
     */
    getQuantity() {
        return this.getElements('#quantity')[0];
    }
}