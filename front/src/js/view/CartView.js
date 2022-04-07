import { View } from './View';
import { Cart } from '../entity/Cart';

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

        if (message) {
            this.displayNotification(message);
        }

        for (let cartProduct of cart.products) {
            let articleWrapper = this.createElement('article', {
                class: 'cart__item',
                'data-id': cartProduct.id,
                'data-color': cartProduct.color,
            });

            //Image element
            let imageWrapper = this.createElement('div', {
                class: 'cart__item__img',
            });
            let imageElement = this.createElement('img', {
                src: cartProduct.product.imageSource,
                alt: cartProduct.product.imageAltText,
            });
            imageWrapper.appendChild(imageElement);

            //Content
            let contentWrapper = this.createElement('div', {
                class: 'cart__item__content',
            });

            //Description
            let descriptionWrapper = this.createElement('div', {
                class: 'cart__item__content__description',
            });
            let nameElement = this.createElement('h2');
            nameElement.textContent = cartProduct.product.name;
            let colorElement = this.createElement('p');
            colorElement.textContent = cartProduct.color;
            let priceElement = this.createElement('p');
            priceElement.textContent = cartProduct.product.price + ' €';
            descriptionWrapper.appendChild(nameElement);
            descriptionWrapper.appendChild(colorElement);
            descriptionWrapper.appendChild(priceElement);

            //Settings
            let settingsWrapper = this.createElement('div', {
                class: 'cart__item__content__settings',
            });

            //Quantity
            let quantitySettingWrapper = this.createElement('div', {
                class: 'cart__item__content__settings__quantity',
            });
            let quantityLabelElement = this.createElement('p');
            quantityLabelElement.textContent = 'Qté : ';
            let quantityInputElement = this.createElement('input', {
                type: 'number',
                class: 'itemQuantity',
                name: 'itemQuantity',
                min: '1',
                max: '100',
                value: cartProduct.quantity,
            });
            quantitySettingWrapper.appendChild(quantityLabelElement);
            quantitySettingWrapper.appendChild(quantityInputElement);

            //Delete
            let deleteSettingWrapper = this.createElement('div', {
                class: 'cart__item__content__settings__delete',
            });
            let deleteTextElement = this.createElement('p', {
                class: 'deleteItem',
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
        let totalQuantity = cart.totalQuantity;
        this.insertTotals(totalPrice === undefined ? 0 : totalPrice, totalQuantity === undefined ? 0 : totalQuantity);
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

    /**
     * Display error to the invalide fields, and delete erros for the valid fields of the contact form.
     * @param {Object} errors - Object containing one property per invalide field, containing the error text.
     */
    displayContactFormError(errors) {
        const formElement = this.getElements('.cart__order__form')[0];

        for (let inputElement of formElement.elements) {
            let fieldName = inputElement.name;
            if (errors[fieldName] === undefined) {
                errors[fieldName] = '';
            }
            let errorElement = document.getElementById(fieldName + 'ErrorMsg');
            if (errorElement !== null) {
                errorElement.textContent = errors[fieldName];
            }
        }
    }

    /**
     * Delete a product cart corresponding to the given data.
     * @param {string} id - ID of the product.
     * @param {string} color - Color of the product.
     */
    removeProductFromDom(id, color) {
        const elementsToRemove = this.getElements(`[data-id="${id}"][data-color="${color}"]`);
        for (let element of elementsToRemove) {
            element.remove();
        }
    }

    /**
     * Create an event listener for the "delete" button.
     * @param {Function} callback - The function to call when the event fires.
     */
    addDeleteProductEventListener(callback) {
        const deleteCommands = this.getElements('.deleteItem');
        for (let deleteCommand of deleteCommands) {
            deleteCommand.addEventListener('click', callback);
        }
    }

    /**
     * Create an event listener for the "quantity" number input, on change.
     * @param {Function} callback - The function to call when the event fires.
     */
    addUpdateProductQuantityEventListener(callback) {
        const quantityCommands = this.getElements('.itemQuantity');
        for (let quantityCommand of quantityCommands) {
            quantityCommand.addEventListener('change', callback);
        }
    }

    /**
     * Create an event listener for the "quantity" number input, on change.
     * @param {Function} callback - The function to call when the event fires.
     */
    addSubmitOrderFormEventListener(callback) {
        const orderFormElements = this.getElements('.cart__order__form');
        for (let formElement of orderFormElements) {
            formElement.addEventListener('submit', callback);
        }
    }
}
