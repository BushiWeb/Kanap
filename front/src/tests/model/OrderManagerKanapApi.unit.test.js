import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { OrderManagerKanapApi } from '../../js/model/OrderManagerKanapApi';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { Order } from '../../js/entity/Order';
import { Contact } from '../../js/entity/Contact';
import { MOCKED_ORDER_DATA, MOCKED_ORDER_DATA_RETURNED } from '../data/mockedOrderData';

describe('OrderManagerKanapApi Unit Test Suite', () => {
    const orderManager = new OrderManagerKanapApi(CONFIG_TEST);

    describe('sendOrder() Method Test Suite', () => {
        const mockSendOrderDao = jest.spyOn(ProductApiDao.prototype, 'sendOrder');
        const orderData = MOCKED_ORDER_DATA();
        const returnedOrderData = MOCKED_ORDER_DATA_RETURNED();
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
