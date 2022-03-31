import { View } from "./View";
import { Cart } from "../entity/Cart";

/**
 * Class managing the rendering and the interactions with the content of the cart page.
 * @extends View
 */
export class CartView extends View {
    /**
     * Render the dynamic content of the cart page.
     * Add the cart content to the page.
     * @param {Cart} cart - A cart entity to display.
     * @param {string} message - A message to display.
     */
    render(cart, message = '') {
        let containerElement = this.getElements('#cart__items')[0];

        if(message) {
            this.displayNotification(message);
        }

        for (let cartProduct of cart.products) {
            let articleWrapper = this.createElement('article', {
                class: 'cart__item',
                'data-id': cartProduct.id,
                'data-color': cartProduct.color
            });

            //Image element
            let imageWrapper = this.createElement('div', {
                class: 'cart__item__img'
            });
            let imageElement = this.createElement('img', {
                src: cartProduct.product.imageSource,
                alt: cartProduct.product.imageAltText
            });
            imageWrapper.appendChild(imageElement);

            //Content
            let contentWrapper = this.createElement('div', {
                class: 'cart__item__content'
            });

            //Description
            let descriptionWrapper = this.createElement('div', {
                class: 'cart__item__content__description'
            });
            let nameElement = this.createElement('h2');
            nameElement.textContent = cartProduct.product.name;
            let colorElement = this.createElement('p');
            colorElement.textContent = cartProduct.color;
            let priceElement = this.createElement('p');
            priceElement.textContent = cartProduct.product.price;
            descriptionWrapper.appendChild(nameElement);
            descriptionWrapper.appendChild(colorElement);
            descriptionWrapper.appendChild(priceElement);

            //Settings
            let settingsWrapper = this.createElement('div', {
                class: 'cart__item__content__settings'
            });

            //Quantity
            let quantitySettingWrapper = this.createElement('div', {
                class: 'cart__item__content__settings__quantity'
            });
            let quantityLabelElement = this.createElement('p');
            quantityLabelElement.textContent = 'Qté : ';
            let quantityInputElement = this.createElement('input', {
                type: 'number',
                class: 'itemQuantity',
                name: 'itemQuantity',
                min: '1',
                max: '100',
                value: cartProduct.quantity
            });
            quantitySettingWrapper.appendChild(quantityLabelElement);
            quantitySettingWrapper.appendChild(quantityInputElement);

            //Delete
            let deleteSettingWrapper = this.createElement('div', {
                class: 'cart__item__content__settings__delete'
            });
            let deleteTextElement = this.createElement('p', {
                class: 'deleteItem'
            });
            deleteTextElement.textContent = 'Supprimer';
            deleteSettingWrapper.appendChild(deleteTextElement);

            settingsWrapper.appendChild(quantitySettingWrapper);
            settingsWrapper.appendChild(deleteSettingWrapper);

            contentWrapper.appendChild(descriptionWrapper);
            contentWrapper.appendChild(settingsWrapper);

            articleWrapper.appendChild(imageWrapper);
            articleWrapper.appendChild(contentWrapper);

            containerElement.appendChild(articleWrapper);
        }

        let totalPrice = cart.totalPrice;
        let totalQuantity = cart.totalQuantity
        this.insertTotals((totalPrice === undefined)? 0 : totalPrice, (totalQuantity === undefined)? 0 : totalQuantity);
    }


    /**
     * Insert the total quantity in the page.
     * @param {number} quantity - Value to insert.
     */
    insertTotalQuantity(quantity) {
        this.getElements('#totalQuantity')[0].textContent = quantity;

    }


    /**
     * Insert the total price in the page.
     * @param {number} price - Value to insert.
     */
    insertTotalPrice(price) {
        this.getElements('#totalPrice')[0].textContent = price;
    }


    /**
     * Insert the total price and quantity in the page.
     * @param {number} price - Price to insert.
     * @param {number} quantity - Quantity to insert.
     */
    insertTotals(price, quantity) {
        this.insertTotalPrice(price);
        this.insertTotalQuantity(quantity);
    }
}