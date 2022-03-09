import { ConfigManager } from "./ConfigManager";
import { CONFIG_TEST, TEST_URL } from "./mocked-configuration";

describe('Config class Unit Test Suite', () => {
    it('should contain JSON data whenn passed JSON data', () => {
        expect(new ConfigManager(CONFIG_TEST).data).toBeInstanceOf(Object);
    });

    it('should contain JSON data when passed string data', () => {
        let data = JSON.stringify(CONFIG_TEST);
        expect(new ConfigManager(data).data).toBeInstanceOf(Object);
    });

    it('should return a URL', () => {
        expect(new ConfigManager(CONFIG_TEST).getApiUrl()).toBe(TEST_URL);
    });
});