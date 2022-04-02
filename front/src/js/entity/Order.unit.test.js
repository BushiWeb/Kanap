import { Order } from './Order';
import { Contact } from './Contact';

jest.mock('./Contact', () => {
    return {
        Contact: jest.fn().mockImplementation((name) => {
            return {
                name: name,
            };
        }),
    };
});

beforeEach(() => {
    Contact.mockClear();
});

describe('Order Unit Test Suite', () => {
    describe('Constructor Test Suite', () => {
        it('should create an instance of Order with the right informations', () => {
            const testContact = new Contact('John');
            const testIdArray = ['1', '2', '3'];
            const orderEntity = new Order(testContact, testIdArray);
            expect(orderEntity._contact).toEqual(testContact);
            expect(orderEntity._productIds).toEqual(testIdArray);
            expect(orderEntity._orderId).toBeUndefined();
        });
    });

    describe('Getters Test Suite', () => {
        const testContact = new Contact('John');
        const testIdArray = ['1', '2', '3'];
        const orderEntity = new Order(testContact, testIdArray);

        it('should return the value of Order._orderId', () => {
            orderEntity._orderId = '123';
            expect(orderEntity.orderId).toBe(orderEntity._orderId);
        });

        it('should return the value of Order._productIds', () => {
            expect(orderEntity.productIds).toBe(orderEntity._productIds);
        });

        it('should return the value of Order._productIds', () => {
            expect(orderEntity.contact).toBe(orderEntity._contact);
        });
    });

    describe('Setters Test Suite', () => {
        const testContact = new Contact('John');
        const testIdArray = ['1', '2', '3'];
        const orderEntity = new Order(testContact, testIdArray);

        it('should return the value of Order._orderId', () => {
            const testId = '123';
            orderEntity.orderId = testId;
            expect(orderEntity._orderId).toBe(testId);
        });
    });
});
