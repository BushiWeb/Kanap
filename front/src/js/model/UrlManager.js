/**
 * Mediator to allow easy interaction between the script and the URL API
 */
export class UrlManager {
    /**
     * Creates a new URL object and sets it up
     * @param {string} url - URL to give to the URL Object
     * @param {Object.<name:string, value:string} parameters - URL parameters to add to the URL
     */
    constructor(url = window.location.href, parameters) {
        this.url = new URL(url);

        for (const parameterName in parameters) {
            this.addParameter(parameterName, parameters[parameterName]);
        }
    }


    /**
     * Changes the URL of the URL object
     * @param {string} newUrl - New URL to give to the object
     */
    setUrl(newUrl) {
        this.url.href = newUrl;
    }


    /**
     * Adds parameter to the URL
     * @param {string} parameterName - Parameter name
     * @param {string} parameterValue - Parameter value
     */
    addParameter(parameterName, parameterValue) {
        this.url.searchParams.append(parameterName, parameterValue);
    }


    /**
     * Fetch parameter from the URL
     * @param {string} parameterName - Name of the parameter to fetch
     * @returns {string | number} Return the value of the parameter or -1 if the parameter doesn't exist
     */
    getParameter(parameterName) {
        if (!this.url.searchParams.has(parameterName)) {
            return -1;
        }

        return this.url.searchParams.get(parameterName);
    }
}