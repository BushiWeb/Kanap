/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { ProductView } from './ProductView';
import { MOCKED_API_DATA } from "../api/mockedApiData";


describe('ProduttView Unit Test Suite', () => {
    const productViewTest = new ProductView();

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

        document.body.appendChild(imageContainerElt);
        document.body.appendChild(titleElt);
        priceContainerElt.appendChild(priceElt);
        document.body.appendChild(priceContainerElt);
        document.body.appendChild(descriptionElt);
        selectElt.appendChild(optionElt);
        document.body.appendChild(selectElt);
    });

    describe('render() Method Test Suite', () => {
        it('should insert the product and return 0 when passed one product', () => {
            const renderResult = productViewTest.render(MOCKED_API_DATA[0]);

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
            expect(renderResult).toBe(0);
        });


        it('should return -1 and print an error if at least one container does not exist', () => {
            const consoleMock = jest.spyOn(global.console, 'error').mockImplementationOnce();
            consoleMock.mockReset();
            let descriptionElt = document.getElementById('description');
            document.body.removeChild(description);
            const renderResult = productViewTest.render(MOCKED_API_DATA[0]);
            expect(renderResult).toBe(-1);
            expect(consoleMock).toHaveBeenCalled();
        });
    });
});