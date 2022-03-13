/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { ProductControler } from './ProductControler';
import { CONFIG_TEST } from '../config/mocked-configuration';
import { MOCKED_API_DATA } from '../api/mockedApiData';

describe('ProductControler Functionnal Test Suite', () => {
    const testUrl = 'http://localhost/product.html?id=' + MOCKED_API_DATA[0]._id;
    const controlerTest = new ProductControler(CONFIG_TEST);

    beforeEach(() => {
        document.body.innerHTML = '';

        const imageContainerElt = document.createElement('div');
        imageContainerElt.classList.add('item__img');

        const titleElt = document.createElement('h1');
        titleElt.id = 'title';

        const priceContainerElt = document.createElement('p');
        const priceElt = document.createElement('span');
        priceElt.id = 'price';

        const descriptionElt = document.createElement('p');
        descriptionElt.id = 'description';

        const selectElt = document.createElement('select');
        selectElt.id = 'colors';
        const optionElt = document.createElement('option');

        const addToCartButton = document.createElement('button');
        addToCartButton.id = 'addToCart';

        document.body.appendChild(imageContainerElt);
        document.body.appendChild(titleElt);
        priceContainerElt.appendChild(priceElt);
        document.body.appendChild(priceContainerElt);
        document.body.appendChild(descriptionElt);
        selectElt.appendChild(optionElt);
        document.body.appendChild(selectElt);
        document.body.appendChild(addToCartButton);
    });


    describe('initialize() Method Test Suite', () => {
        global.fetch = jest.fn().mockImplementation();

        beforeEach(() => {
            global.fetch.mockReset();
        });

        it('should display the product\'s infos if no error occurs while fetching', async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(MOCKED_API_DATA[0]),
                ok: true
            })

            await controlerTest.initialize();

            const imageElt = document.querySelector('.item__img img');
            const titleElt = document.getElementById('title');
            const priceElt = document.getElementById('price');
            const descriptionElt = document.getElementById('description');
            const selectElt = document.getElementById('colors');
            const optionElts = document.querySelectorAll('#colors option');

            expect(imageElt).toBeDefined();
            expect(imageElt).toHaveAttribute('src', MOCKED_API_DATA[0].imageUrl);
            expect(imageElt).toHaveAttribute('alt', MOCKED_API_DATA[0].altTxt);
            expect(titleElt).toHaveTextContent(MOCKED_API_DATA[0].name);
            expect(priceElt).toHaveTextContent(MOCKED_API_DATA[0].price);
            expect(descriptionElt).toHaveTextContent(MOCKED_API_DATA[0].description);
            for (let i = 1 ; i < optionElts.length ; i++) {
                expect(selectElt).toContainElement(optionElts[i]);
                expect(optionElts[i]).toHaveAttribute('value', MOCKED_API_DATA[0].colors[i - 1]);
                expect(optionElts[i]).toHaveTextContent(MOCKED_API_DATA[0].colors[i - 1]);
            }
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