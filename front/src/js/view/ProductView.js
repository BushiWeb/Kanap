import { View } from "./View";

/**
 * Class managing rendering and intarctions with the content of the Product page
 */
export class ProductView extends View {
    /**
     * Renders the dynamic content of the product page: insert the elements in the right containers.
     * @param {Object} product - Object containing the data of the product
     * @returns {number} 0 if the rendering succeeds or -1 if not.
     */
    render(product) {
        const imageContainerElement = this.getElements('.item__img')[0];
        const titleContainerElement = this.getElements('#title')[0];
        const priceContainerElement = this.getElements('#price')[0];
        const descriptionContainerElement = this.getElements('#description')[0];
        const selectColorsElement = this.getElements('#colors')[0];

        let result = 0;

        if (imageContainerElement) {
            const imageElement = this.createElement('img', {
                src: product.imageUrl,
                alt: product.altTxt
            });
            imageContainerElement.appendChild(imageElement);
        } else {
            result = -1;
            console.error('The image container does not exist');
        }

        if (titleContainerElement) {
            titleContainerElement.textContent = product.name;
        } else {
            result = -1;
            console.error('The title container does not exist');
        }

        if (priceContainerElement) {
            priceContainerElement.textContent = product.price;
        } else {
            result = -1;
            console.error('The price container does not exist');
        }

        if (descriptionContainerElement) {
            descriptionContainerElement.textContent = product.description;
        } else {
            result = -1;
            console.error('The description container does not exist');
        }

        if (selectColorsElement) {
            for (const color of product.colors) {
                const optionElt = this.createElement('option', {
                    value: color
                });
                optionElt.textContent = color;
                selectColorsElement.appendChild(optionElt);
            }
        } else {
            result = -1;
            console.error('The select input does not exist');
        }

        return result;
    }
}