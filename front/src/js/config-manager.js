import { CONFIG } from "./config";

/**
 * Class managing configuration data.
 */
export class ConfigManager {
    /**
     * Get data from the given JSON Object and store those data in the data property.
     * @param {string} data - Configuration object. The default value is the default configuration object.
     */
    constructor(data = CONFIG) {
        this.data = (typeof data === "string")? JSON.parse(data) : data;
    }

    /**
     * Get API URL from config file.
     * @returns {string} API URL
     */
    getApiUrl() {
        let url = '';
        url += (this.data.url.protocol)? this.data.url.protocol + '://' : '';
        url += (this.data.url.domain)? this.data.url.domain : this.data.url.ip;
        url += (this.data.url.port)? ':' + this.data.url.port : '';
        url += (this.data.url.path)? '/' + this.data.url.path : '';
        return url;
    }
}