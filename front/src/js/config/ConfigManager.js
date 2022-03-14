/**
 * Class managing configuration data.
 */
export class ConfigManager {
    /**
     * Get data from the given JSON Object and store those data in the data property.
     * @param {Object | string} data - Configuration object. Can also be a stringifyed version of the object.
     */
    constructor(data) {
        this.data = (typeof data === "string")? JSON.parse(data) : data;
    }

    /**
     * Build API URL from config data.
     * @return {string} Return the API URL.
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