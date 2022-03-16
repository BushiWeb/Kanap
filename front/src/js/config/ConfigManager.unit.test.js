import { ConfigManager } from "./ConfigManager";
import { CONFIG_TEST, TEST_URL } from "./mocked-configuration";

describe('Config class Unit Test Suite', () => {
    describe('constructor() Test Suite', () => {
        it('should contain JSON data when passed JSON data', () => {
            expect(new ConfigManager(CONFIG_TEST).data).toBeInstanceOf(Object);
        });

        it('should contain JSON data when passed string data', () => {
            let data = JSON.stringify(CONFIG_TEST);
            expect(new ConfigManager(data).data).toBeInstanceOf(Object);
        });
    });


    describe('getApiUrl() Test Suite', () => {
        it('should return the correct URL if all the informations and the domain are in the configuration', () => {
            expect(new ConfigManager(CONFIG_TEST).getApiUrl()).toBe(TEST_URL);
        });

        it('should return the correct URL if there is just the domain in the configuration', () => {
            let domainConfiguration = CONFIG_TEST;
            domainConfiguration.url.protocol = '';
            domainConfiguration.url.path = '';
            domainConfiguration.url.port = '';
            const domainUrl = CONFIG_TEST.url.domain;
            expect(new ConfigManager(domainConfiguration).getApiUrl()).toBe(domainUrl);
        });

        it('should return the correct URL if there is just the ip in the configuration', () => {
            let ipConfiguration = CONFIG_TEST;
            ipConfiguration.url.protocol = '';
            ipConfiguration.url.path = '';
            ipConfiguration.url.port = '';
            ipConfiguration.url.domain = '';
            const ipUrl = CONFIG_TEST.url.ip;
            expect(new ConfigManager(ipConfiguration).getApiUrl()).toBe(ipUrl);
        });
    });
});