/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { HomeControler } from '../../js/controler/HomeControler';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';

describe('HomeControler Functionnal Test Suite', () => {
    const controlerTest = new HomeControler(CONFIG_TEST);

    describe('initialize() Method Test Suite', () => {
        global.fetch = jest.fn().mockImplementation();

        beforeEach(() => {
            global.fetch.mockReset();
            document.body.innerHTML = '';
            const container = document.createElement('section');
            container.id = 'items';
            document.body.appendChild(container);

            controlerTest.productManager.productsListComplete = false;
            controlerTest.productManager.products = [];
        });

        it('should display the list of products, with the right number of cards', async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });
            controlerTest.productManager.productsListComplete = false;
            controlerTest.productManager.products = [];

            await controlerTest.initialize();
            const productsCardElements = document.getElementsByTagName('a');
            expect(productsCardElements.length).toBe(MOCKED_API_DATA.length);
        });

        it("should display the right produt's informations", async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });

            await controlerTest.initialize();

            const productsCardElements = document.getElementsByTagName('a');
            const nameElement = document.getElementsByClassName('productName')[0];
            const descriptionElement = document.getElementsByClassName('productDescription')[0];
            const imageElement = document.getElementsByTagName('img')[0];

            expect(productsCardElements[0]).toContainElement(nameElement);
            expect(productsCardElements[0]).toContainElement(descriptionElement);
            expect(productsCardElements[0]).toContainElement(imageElement);

            expect(nameElement).toHaveTextContent(MOCKED_API_DATA[0].name);
            expect(descriptionElement).toHaveTextContent(MOCKED_API_DATA[0].description);
            expect(productsCardElements[0]).toHaveAttribute('href', './product.html?id=' + MOCKED_API_DATA[0]._id);
            expect(imageElement).toHaveAttribute('src', MOCKED_API_DATA[0].imageUrl);
            expect(imageElement).toHaveAttribute('alt', MOCKED_API_DATA[0].altTxt);
        });

        it('should save the data in the manager', async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(MOCKED_API_DATA),
                ok: true,
            });

            await controlerTest.initialize();
            expect(controlerTest.productManager.products).toEqual(MOCKED_PRODUCT_ENTITY_DATA);
            expect(controlerTest.productManager.productsListComplete).toBeTruthy();
        });

        it('should alert and print an error if an error occurs while fetching the data', async () => {
            const consoleMock = jest.spyOn(global.console, 'error');
            const alertMock = jest.spyOn(window, 'alert');
            consoleMock.mockReset();
            alertMock.mockReset();

            const error = new Error('Error while fetching');
            global.fetch.mockRejectedValue(error);

            await controlerTest.initialize();

            expect(consoleMock).toHaveBeenCalled();
            expect(alertMock).toHaveBeenCalled();
        });
    });
});
