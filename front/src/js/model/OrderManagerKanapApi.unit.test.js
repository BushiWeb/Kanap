import { ProductApiDao } from '../dao/ProductApiDao';
import { OrderManagerKanapApi } from './OrderManagerKanapApi';
import { MOCKED_API_DATA } from '../dao/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from './mockedProductEntityData';
import { CONFIG_TEST } from '../config/mocked-configuration';
import { Product } from '../entity/Product';
import { Order } from '../entity/Order';
import { Contact } from '../entity/Contact';

describe('OrderManagerKanapApi Unit Test Suite', () => {
    const orderManager = new OrderManagerKanapApi(CONFIG_TEST);

    describe('sendOrder() Method Test Suite', () => {
        const mockSendOrderDao = jest.spyOn(ProductApiDao.prototype, 'sendOrder');
        const orderData = {
            contact: {
                firstName: 'Flam',
                lastName: 'Captain',
                address: 'Moon',
                city: 'Space',
                email: 'captainflam@hero.gal',
            },
            products: [MOCKED_API_DATA[0]._id, MOCKED_API_DATA[1]._id],
        };
        const returnedOrderData = {
            contact: orderData.contact,
            products: [MOCKED_PRODUCT_ENTITY_DATA[0], MOCKED_PRODUCT_ENTITY_DATA[1]],
            orderId: '123',
        };
        const updatedOrderEntity = new Order(
            new Contact(
                returnedOrderData.contact.firstName,
                returnedOrderData.contact.lastName,
                returnedOrderData.contact.address,
                returnedOrderData.contact.city,
                returnedOrderData.contact.email
            ),
            returnedOrderData.products,
            returnedOrderData.orderId
        );

        beforeEach(() => {
            mockSendOrderDao.mockReset();
        });

        it('should call the ProductApiDao.sendOrder() method', async () => {
            mockSendOrderDao.mockResolvedValueOnce(returnedOrderData);

            await orderManager.sendOrder(orderData);
            expect(mockSendOrderDao).toHaveBeenCalled();
        });

        it('should update the Order entity', async () => {
            mockSendOrderDao.mockResolvedValueOnce(returnedOrderData);

            await orderManager.sendOrder(orderData);
            expect(orderManager.order).toEqual(updatedOrderEntity);
        });

        it('should return the Order entity', async () => {
            mockSendOrderDao.mockResolvedValueOnce(returnedOrderData);

            const resultData = await orderManager.sendOrder(orderData);
            expect(resultData).toEqual(orderManager.order);
        });
    });
});
