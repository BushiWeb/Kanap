import { ProductApiManager } from "./ProductApiManager";
import { MOCKED_API_DATA } from "./mockedApiData";
import { CONFIG_TEST } from "../config/mocked-configuration";

let testApiManager;

describe('ProductApiManager Constructor Test Suite', () => {
    it('should contain the right API URL', () => {
        testApiManager = new ProductApiManager(CONFIG_TEST);
        expect(testApiManager.apiUrl).toBe('http://localhost:3000/api/products/');
    });
});