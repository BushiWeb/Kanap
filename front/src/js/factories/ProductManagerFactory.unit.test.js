import { ProductManagerFactory } from "./ProductManagerFactory";
import { ProductManager } from "../model/ProductManager";
import { CONFIG_TEST } from '../config/mocked-configuration';

describe('ProductManagerFactory Unit Test Suite', () => {
    describe('createProductManager() Method Test Suite', () => {
        it('should return an instance of ProductManager', () => {
            const productManager = ProductManagerFactory.createProductManager(CONFIG_TEST);
            expect(productManager instanceof ProductManager).toBeTruthy();
        });
    });
})