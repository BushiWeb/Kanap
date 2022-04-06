/**
 * @jest-environment jsdom
 */

import { LocalStorageDao } from '../../js/dao/LocalStorageDao';

describe('LocalStorageDao Unit Test Suite', () => {
    const localStorageDao = new LocalStorageDao();
    const propertyName = 'name';

    describe('getData() Methode Test Suite', () => {
        it('should return the data from the local storage', () => {
            const valueToGet = 'test';
            localStorage.setItem(propertyName, valueToGet);
            const result = localStorageDao.getData(propertyName);
            expect(result).toBe(valueToGet);
        });

        it("should return undefined if the localStorage doesn't contain the data", () => {
            localStorage.clear();
            const result = localStorageDao.getData(propertyName);
            expect(result).toBe(undefined);
        });

        it('should return the data from the local storage parsed', () => {
            const valueToGet = {
                a: 'test',
                b: 1,
            };
            localStorage.setItem(propertyName, JSON.stringify(valueToGet));
            const result = localStorageDao.getData(propertyName, true);
            expect(result).toEqual(valueToGet);
        });
    });

    describe('setData() Methode Test Suite', () => {
        it('should call localStorage.setItem() if the value is a string', () => {
            const textData = 'text';
            localStorageDao.setData(propertyName, textData);
            expect(localStorage.getItem(propertyName)).toBe(textData);
        });

        it('should call localStorage.setItem() with serialized object if the value is an object', () => {
            const objectData = {
                a: 'test',
                b: 1,
            };
            localStorageDao.setData(propertyName, objectData);
            expect(localStorage.getItem(propertyName)).toBe(JSON.stringify(objectData));
        });

        it('should call localStorage.setItem() with serialized value if the value is non textuel primitive value', () => {
            const numberData = 3;
            localStorageDao.setData(propertyName, numberData);
            expect(localStorage.getItem(propertyName)).toBe(numberData.toString());
        });
    });
});
