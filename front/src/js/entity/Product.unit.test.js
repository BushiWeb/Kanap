import { Product } from './Product';

import { MOCKED_API_DATA } from '../dao/mockedApiData';

describe('Product Unit Test Suite', () => {
    describe('Constructor Test Suite', () => {
        it('should create an instance of Product with the right informations', () => {
            const testProduct = MOCKED_API_DATA[0];
            const productEntity = new Product(
                testProduct._id,
                testProduct.name,
                testProduct.price,
                testProduct.description,
                testProduct.imageUrl,
                testProduct.altTxt,
                testProduct.colors
            );
            expect(productEntity._id).toBe(testProduct._id);
            expect(productEntity._name).toBe(testProduct.name);
            expect(productEntity._price).toBe(testProduct.price);
            expect(productEntity._description).toBe(testProduct.description);
            expect(productEntity._imageSource).toBe(testProduct.imageUrl);
            expect(productEntity._imageAltText).toBe(testProduct.altTxt);
            expect(productEntity._colors).toEqual(testProduct.colors);
        });
    });

    describe('Getters Test Suite', () => {
        const testProduct = MOCKED_API_DATA[0];
        const productEntity = new Product(
            testProduct._id,
            testProduct.name,
            testProduct.price,
            testProduct.description,
            testProduct.imageUrl,
            testProduct.altTxt,
            testProduct.colors
        );

        it('should return the value of Product._id', () => {
            expect(productEntity.id).toBe(productEntity._id);
        });

        it('should return the value of Product._name', () => {
            expect(productEntity.name).toBe(productEntity._name);
        });

        it('should return the value of Product._price', () => {
            expect(productEntity.price).toBe(productEntity._price);
        });

        it('should return the value of Product._description', () => {
            expect(productEntity.description).toBe(productEntity._description);
        });

        it('should return the value of Product._imageSource', () => {
            expect(productEntity.imageSource).toBe(productEntity._imageSource);
        });

        it('should return the value of Product._imageAltText', () => {
            expect(productEntity.imageAltText).toBe(productEntity._imageAltText);
        });

        it('should return the value of Product._colors', () => {
            expect(productEntity.colors).toBe(productEntity._colors);
        });
    });
});
