import { OrderManagerFactory } from './OrderManagerFactory';
import { OrderManager } from '../model/OrderManager';
import { OrderManagerKanapApi } from '../model/OrderManagerKanapApi';
import { CONFIG_TEST } from '../config/mocked-configuration';

describe('OrderManagerFactory Fonctionnal Test Suite', () => {
    describe('createOrderManager() Method Test Suite', () => {
        it('should return an instance of OrderManagerKanapApi if called with "KanapApi"', () => {
            const orderManager = OrderManagerFactory.createOrderManager('KanapApi', CONFIG_TEST);
            expect(orderManager instanceof OrderManagerKanapApi).toBeTruthy();
        });
    });

    describe('createOrderManagerKanapApi() Method Test Suite', () => {
        it('should return an instance of OrderManagerKanapApi', () => {
            const orderManager = OrderManagerFactory.createOrderManagerKanapApi(CONFIG_TEST);
            expect(orderManager instanceof OrderManagerKanapApi).toBeTruthy();
        });
    });
});
