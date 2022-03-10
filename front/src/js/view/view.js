/**
 * View parent class containing utility methods to help rendering.
 */
export class View {
    /**
     * Calls the window.alert() method.
     * @param {string} message - Message to display in the alert
     */
    alert(message) {
        window.alert(message);
    }

    /**
     * Create a DOM Element with attributes.
     * @param {string} element - Element tag to create
     * @param {Object} attributes - Element attributes to add to the new element
     * @returns {HTMLElement} Element object that has been created
     */
    createElement(element, attributes) {
        let createdElement = document.createElement(element);
        for (let attribute in attributes) {
            createdElement.setAttribute(attribute, attributes[attribute]);
        }
        return createdElement;
    }

    /**
     * Fetch elements from the DOM using their id, class or a CSS selector.
     * @param {string} selector - Selector of the elements to query
     * @returns {HTMLElement[]} Array of HTMLElement
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