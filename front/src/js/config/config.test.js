import { ConfigManager } from "./config-manager";

const CONFIG_TEST = {
    url: {
        protocol: "http",
        ip: "127.0.0.1",
        domain: "localhost",
        port: 3000,
        path: "api/products/"
    }
}

describe('Config class Unit Test Suite', () => {
    it('should contain JSON data whenn passed JSON data', () => {
        expect(new ConfigManager(CONFIG_TEST).data).toBeInstanceOf(Object);
    });

    it('should contain JSON data whenn passed string data', () => {
        let data = JSON.stringify(CONFIG_TEST);
        expect(new ConfigManager(data).data).toBeInstanceOf(Object);
    });

    it('should return a URL', () => {
        expect(new ConfigManager(CONFIG_TEST).getApiUrl()).toBe('http://localhost:3000/api/products/');
    });
});