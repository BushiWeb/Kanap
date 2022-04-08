import { Contact } from '../../js/entity/Contact';
import { MOCKED_ORDER_DATA } from '../data/mockedOrderData';

describe('Contact Unit Test Suite', () => {
    const contactInfos = MOCKED_ORDER_DATA().contact;

    describe('Constructor Test Suite', () => {
        it('should create an instance of Contact with the right informations', () => {
            const contactEntity = new Contact(
                contactInfos.firstName,
                contactInfos.lastName,
                contactInfos.address,
                contactInfos.city,
                contactInfos.email
            );
            expect(contactEntity._firstName).toEqual(contactEntity.firstName);
            expect(contactEntity._lastName).toEqual(contactEntity.lastName);
            expect(contactEntity._address).toEqual(contactEntity.address);
            expect(contactEntity._city).toEqual(contactEntity.city);
            expect(contactEntity._email).toEqual(contactEntity.email);
        });
    });

    describe('Getters Test Suite', () => {
        const contactEntity = new Contact(
            contactInfos.firstName,
            contactInfos.lastName,
            contactInfos.address,
            contactInfos.city,
            contactInfos.email
        );

        it('should return the value of Contact._firstName', () => {
            expect(contactEntity.firstName).toBe(contactEntity._firstName);
        });

        it('should return the value of Contact._lastName', () => {
            expect(contactEntity.lastName).toBe(contactEntity._lastName);
        });

        it('should return the value of Contact._address', () => {
            expect(contactEntity.address).toBe(contactEntity._address);
        });

        it('should return the value of Contact._city', () => {
            expect(contactEntity.city).toBe(contactEntity._city);
        });

        it('should return the value of Contact._email', () => {
            expect(contactEntity.email).toBe(contactEntity._email);
        });
    });
});
