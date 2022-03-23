import { ProductManagerFactory } from "./ProductManagerFactory";
import { CONFIG_TEST } from '../config/mocked-configuration';
import { ProductManagerKanapApi } from "../model/ProductManagerKanapApi";

describe('ProductManagerFactory Unit Test Suite', () => {
    describe('createProductManager() Method Test Suite', () => {
        it('should return an instance of ProductManagerKanapApi if called with "KanapApi"', () => {
            const productManager = ProductManagerFactory.createProductManager('KanapApi', CONFIG_TEST);
            expect(productManager instanceof ProductManagerKanapApi).toBeTruthy();
        });
    });

    describe('createProductManagerKanapApi() Method Test Suite', () => {
        it('should return an instance of ProductManagerKanapApi', () => {
            const productManager = ProductManagerFactory.createProductManagerKanapApi(CONFIG_TEST);
            expect(productManager instanceof ProductManagerKanapApi).toBeTruthy();
        });
    });
})