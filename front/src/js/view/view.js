/**
 * View parent class containing utility methods to help rendering.
 */
export class View {
    /**
     * Call the window.alert() method.
     * @param {string} message - The message to display in the alert.
     */
    alert(message) {
        window.alert(message);
    }

    /**
     * Create a notification and display it.
     * If the notification already exists, remove it, change it's content and reinsert it.
     * @param {string} message - The message of the notification.
     */
    displayNotification(message) {
        const notificationContainerId = 'notification-container';
        let notificationContainer = this.getElements('#' + notificationContainerId)[0];

        if (notificationContainer === undefined) {
            notificationContainer = this.createElement('p', {
                id: notificationContainerId,
            });
        } else {
            notificationContainer.remove();
        }

        notificationContainer.textContent = message;
        document.body.append(notificationContainer);
    }

    /**
     * Create error message and display it next to the associated form field.
     * @param {HTMLElement} formField - Form field to associate the error to.
     * @param {string} message - The message of the notification.
     */
    createFormFieldError(formField, message) {
        const errorContainerClass = 'error';

        this.deleteFormFieldError(formField);

        const errorElt = this.createElement('p', {
            class: errorContainerClass,
        });
        errorElt.textContent = message;

        formField.parentElement.insertBefore(errorElt, formField.nextElementSibling);
    }

    /**
     * Delete the error associated to the form field.
     * @param {HTMLElement} formField - Form field associated to the error.
     */
    deleteFormFieldError(formField) {
        if (formField.nextElementSibling !== null && formField.nextElementSibling.classList.contains('error')) {
            formField.nextElementSibling.remove();
        }
    }

    /**
     * Create a DOM Element with attributes.
     * @param {string} element - The element tag to create.
     * @param {Object} attributes - The attributes to add to the new element.
     * @return {HTMLElement} Return the element object that has been created.
     */
    createElement(element, attributes) {
        let createdElement = document.createElement(element);
        for (let attribute in attributes) {
            createdElement.setAttribute(attribute, attributes[attribute]);
        }
        return createdElement;
    }

    /**
     * Get a list of elements from the DOM.
     * @param {string} selector - The selector of the elements to query.
     * @returns {HTMLElement[]} Return an array of elements.
     */
    getElements(selector) {
        let elements = [];
        let fetchResults = document.querySelectorAll(selector);

        for (let i = 0; i < fetchResults.length; i++) {
            elements.push(fetchResults[i]);
        }

        return elements;
    }
}
