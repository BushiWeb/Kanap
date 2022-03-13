import { View } from "./View";

/**
 * Class managing rendering and intarctions with the content of the Product page
 */
export class ProductView extends View {
    /**
     * Renders the dynamic content of the product page: insert the elements in the right containers.
     * @param {Object} product - Object containing the data of the product
     */
    render(product) {
        const imageContainerElement = this.getElements('.item__img')[0];
        const titleContainerElement = this.getElements('#title')[0];
        const priceContainerElement = this.getElements('#price')[0];
        const descriptionContainerElement = this.getElements('#description')[0];
        const selectColorsElement = this.getElements('#colors')[0];

        const imageElement = this.createElement('img', {
            src: product.imageUrl,
            alt: product.altTxt
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
     * Creates an event listener for the "add to cart" button
     * @param {Function} callback - Function to call when the event fires
     */
    addAddToCartEventListener(callback) {
        const addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', callback);
    }
}