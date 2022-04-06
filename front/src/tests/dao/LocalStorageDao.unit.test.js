/**
 * @jest-environment jsdom
 */

import { LocalStorageDao } from '../../js/dao/LocalStorageDao';

describe('LocalStorageDao Unit Test Suite', () => {
    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

    const localStorageDao = new LocalStorageDao();

    beforeEach(() => {
        mockGetItem.mockReset();
        mockSetItem.mockReset();
    });

    describe('getData() Methode Test Suite', () => {
        it('should return the data from the local storage', () => {
            const valueToGet = 'test';
            mockGetItem.mockReturnValue(valueToGet);
            const result = localStorageDao.getData('name');
            expect(result).toBe(valueToGet);
        });

        it("should return undefined if the localStorage doesn't contain the data", () => {
            mockGetItem.mockReturnValue(null);
            const result = localStorageDao.getData('name');
            expect(result).toBe(undefined);
        });

        it('should return the data from the local storage parsed', () => {
            const valueToGet = {
                a: 'test',
                b: 1,
            };
            mockGetItem.mockReturnValue(JSON.stringify(valueToGet));
            const result = localStorageDao.getData('name', true);
            expect(result).toEqual(valueToGet);
        });
    });

    describe('setData() Methode Test Suite', () => {
        const propertyName = 'name';

        it('should call localStorage.setItem() if the value is a string', () => {
            const textData = 'text';
            localStorageDao.setData(propertyName, textData);
            expect(mockSetItem).toHaveBeenCalled();
            expect(mockSetItem).toHaveBeenCalledWith(propertyName, textData);
        });

        it('should call localStorage.setItem() with serialized object if the value is an object', () => {
            const objectData = {
                a: 'test',
                b: 1,
            };
            localStorageDao.setData(propertyName, objectData);
            expect(mockSetItem).toHaveBeenCalled();
            expect(mockSetItem).toHaveBeenCalledWith(propertyName, JSON.stringify(objectData));
        });

        it('should call localStorage.setItem() with serialized value if the value is non textuel primitive value', () => {
            const numberData = 3;
            localStorageDao.setData(propertyName, numberData);
            expect(mockSetItem).toHaveBeenCalled();
            expect(mockSetItem).toHaveBeenCalledWith(propertyName, numberData.toString());
        });
    });
});
