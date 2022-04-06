import { ProductManagerFactory } from '../../js/factories/ProductManagerFactory';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { ProductManagerKanapApi } from '../../js/model/ProductManagerKanapApi';

describe('ProductManagerFactory Fonctionnal Test Suite', () => {
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
});
