import { ProductApiDao } from '../../js/dao/ProductApiDao';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { OrderManagerKanapApi } from '../../js/model/OrderManagerKanapApi';
import { Order } from '../../js/entity/Order';
import { Contact } from '../../js/entity/Contact';

describe('ProductManagerKanapApi Functionnal Test Suite', () => {
    const orderManager = new OrderManagerKanapApi(CONFIG_TEST);

    global.fetch = jest.fn();

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
        global.fetch.mockReset();
    });

    describe('sendOrder() Method Test Suite', () => {
        it('should return the data from the API', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(returnedOrderData),
                ok: true,
            });
            const data = await orderManager.sendOrder(orderData);
            expect(data).toEqual(updatedOrderEntity);
        });

        it('should update the order property', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(returnedOrderData),
                ok: true,
            });
            const data = await orderManager.sendOrder(orderData);
            expect(orderManager.order).toEqual(updatedOrderEntity);
        });

        it('should throw an error if the status is 400', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Error',
            });
            await expect(async () => {
                await orderManager.sendOrder(orderData);
            }).rejects.toThrow();
        });

        it('should throw an error if the status is 500', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Error',
            });
            await expect(async () => {
                await orderManager.sendOrder(orderData);
            }).rejects.toThrow();
        });

        it('should throw an error if the request fails', async () => {
            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);
            await expect(async () => {
                await orderManager.sendOrder(orderData);
            }).rejects.toThrow();
        });

        it("should throw an error if the data don't have the right format", async () => {
            let badData = JSON.parse(JSON.stringify(orderData));
            delete badData.contact;
            await expect(async () => {
                await orderManager.sendOrder(badData);
            }).rejects.toThrow();
        });
    });
});
