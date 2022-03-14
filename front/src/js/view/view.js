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

        for (let i = 0 ; i < fetchResults.length ; i++) {
            elements.push(fetchResults[i]);
        }

        return elements;
    }
}