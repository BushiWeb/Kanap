/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { HomeControler } from './HomeControler';
import { CONFIG_TEST } from '../config/mocked-configuration';
import { MOCKED_API_DATA } from '../api/mockedApiData';

describe('HomeControler Functionnal Test Suite', () => {
    const controlerTest = new HomeControler(CONFIG_TEST);

    describe('initialize() Method Test Suite', () => {
        global.fetch = jest.fn().mockImplementation();

        beforeEach(() => {
            global.fetch.mockReset();
            document.body.innerHTML = '';
        })


        it('should display the list of products', async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok : true
            });

            const container = document.createElement('section');
            container.id = 'items';
            document.body.appendChild(container);
            await controlerTest.initialize();

            const productsCardElements = document.getElementsByTagName('a');
            const nameElement = document.getElementsByClassName('productName')[0];
            const descriptionElement = document.getElementsByClassName('productDescription')[0];
            const imageElement = document.getElementsByTagName('img')[0];

            expect(productsCardElements.length).toBe(MOCKED_API_DATA.length);
            expect(productsCardElements[0]).toContainElement(nameElement);
            expect(productsCardElements[0]).toContainElement(descriptionElement);
            expect(productsCardElements[0]).toContainElement(imageElement);

            expect(nameElement).toHaveTextContent(MOCKED_API_DATA[0].name);
            expect(descriptionElement).toHaveTextContent(MOCKED_API_DATA[0].description);
            expect(productsCardElements[0]).toHaveAttribute('href', './product.html?id=' + MOCKED_API_DATA[0]._id);
            expect(imageElement).toHaveAttribute('src', MOCKED_API_DATA[0].imageUrl);
            expect(imageElement).toHaveAttribute('alt', MOCKED_API_DATA[0].altTxt);
        });
    });
});