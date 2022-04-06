import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { OrderManagerKanapApi } from '../../js/model/OrderManagerKanapApi';
import { MOCKED_API_DATA } from '../../js/dao/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { Order } from '../../js/entity/Order';
import { Contact } from '../../js/entity/Contact';

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
