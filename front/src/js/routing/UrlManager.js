/**
 * Class allowing easy interactions with the URL.
 */
export class UrlManager {
    /**
     * Create a new URL object and set it up
     * @param {string} url - The URL to give to the URL Object.
     * @param {Object} parameters - The URL parameters to add to the URL. It's properties are the parameter's name, and the value the parameter's value.
     */
    constructor(url = window.location.href, parameters) {
        this.url = new URL(url);
        this.parameters = [];

        for (const parameterName in parameters) {
            this.addParameter(parameterName, parameters[parameterName]);
        }
    }

    /**
     * Change the URL of the URL object.
     * @param {string} newUrl - The new URL to give to the object.
     */
    setUrl(newUrl) {
        this.url.href = newUrl;
    }

    /**
     * Add a parameter to the URL.
     * @param {string} parameterName - The parameter name.
     * @param {string} parameterValue - The parameter value.
     */
    addParameter(parameterName, parameterValue) {
        this.url.searchParams.append(parameterName, parameterValue);
        this.parameters[parameterName] = parameterValue;
    }

    /**
     * Get a parameter from the URL.
     * @param {string} parameterName - The name of the parameter.
     * @returns {string | number} Return the value of the parameter.
     * @throws Throw an error if the parameter doesn't exist.
     */
    getParameter(parameterName) {
        if (this.parameters[parameterName] === undefined) {
            if (!this.url.searchParams.has(parameterName)) {
                throw new Error(`The parameter ${parameterName} doesn't exist`);
            }
            this.parameters[parameterName] = this.url.searchParams.get(parameterName);
        }

        return this.parameters[parameterName];
    }

    /**
     * Redirect the page to the manager's url.
     */
    redirect() {
        window.location.assign(this.url.href);
        console.log(window.location.href);
    }
}
