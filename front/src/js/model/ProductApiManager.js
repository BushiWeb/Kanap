import { ConfigManager } from "../config/ConfigManager";

/**
 * Class managing communication with the API
 */
export class ProductApiManager {
    /**
     * Constructor, get API URL from the configuration file
     * @param {Object} config - Optionnal configuration object
     */
    constructor(config) {
        let configuration;
        if (config) {
            configuration = new ConfigManager(config);
        } else {
            configuration = new ConfigManager();
        }

        this.apiUrl = configuration.getApiUrl();
    }
}