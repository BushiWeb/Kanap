/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { getByRole, getByText } from '@testing-library/dom';

import { ProductView } from './ProductView';
import { MOCKED_PRODUCT_ENTITY_DATA } from "../model/mockedProductEntityData";


describe('ProductView Unit Test Suite', () => {
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

        const quantityElt = document.createElement('input');
        quantityElt.type = 'number';
        quantityElt.id = 'quantity';

        const addToCartButton = document.createElement('button');
        addToCartButton.id = 'addToCart';

        document.body.appendChild(imageContainerElt);
        document.body.appendChild(titleElt);
        priceContainerElt.appendChild(priceElt);
        document.body.appendChild(priceContainerElt);
        document.body.appendChild(descriptionElt);
        selectElt.appendChild(optionElt);
        document.body.appendChild(selectElt);
        document.body.appendChild(quantityElt);
        document.body.appendChild(addToCartButton);
    });

    describe('render() Method Test Suite', () => {
        it('should insert the product', () => {
            productViewTest.render(MOCKED_PRODUCT_ENTITY_DATA[0]);

            const imageElt = document.querySelector('.item__img img');
            const titleElt = document.getElementById('title');
            const priceElt = document.getElementById('price');
            const descriptionElt = document.getElementById('description');
            const selectElt = document.getElementById('colors');
            const optionElts = document.querySelectorAll('#colors option');

            expect(imageElt).toBeDefined();
            expect(imageElt).toHaveAttribute('src', MOCKED_PRODUCT_ENTITY_DATA[0].imageSource);
            expect(imageElt).toHaveAttribute('alt', MOCKED_PRODUCT_ENTITY_DATA[0].imageAltText);
            expect(titleElt).toHaveTextContent(MOCKED_PRODUCT_ENTITY_DATA[0].name);
            expect(priceElt).toHaveTextContent(MOCKED_PRODUCT_ENTITY_DATA[0].price);
            expect(descriptionElt).toHaveTextContent(MOCKED_PRODUCT_ENTITY_DATA[0].description);
            for (let i = 1 ; i < optionElts.length ; i++) {
                expect(selectElt).toContainElement(optionElts[i]);
                expect(optionElts[i]).toHaveAttribute('value', MOCKED_PRODUCT_ENTITY_DATA[0].colors[i - 1]);
                expect(optionElts[i]).toHaveTextContent(MOCKED_PRODUCT_ENTITY_DATA[0].colors[i - 1]);
            }
        });
    });


    describe('addAddToCartEventListener() Method Test Suite', () => {
        it('should execute the callback function when the button is clicked', () => {
            let clickResult = false;
            productViewTest.addAddToCartEventListener(() => {
                clickResult = true;
            });

            const buttonElt = document.getElementById('addToCart');
            userEvent.click(buttonElt);
            expect(clickResult).toBeTruthy();
        });
    });


    describe('getColor() Method Test Suite', () => {
        it('should return the select color element', () => {
            productViewTest.render(MOCKED_PRODUCT_ENTITY_DATA[0]);
            const selectElement = getByRole(document.body, 'combobox');
            const selectedColor = productViewTest.getColor();
            expect(selectedColor).toBe(selectElement);
        });

        it('should return the select color element with the right value', () => {
            productViewTest.render(MOCKED_PRODUCT_ENTITY_DATA[0]);

            const selectElement = getByRole(document.body, 'combobox');
            const optionElt = getByText(selectElement, MOCKED_PRODUCT_ENTITY_DATA[0].colors[0]);
            userEvent.selectOptions(selectElement, optionElt);

            const selectedColor = productViewTest.getColor();
            expect(selectedColor.value).toBe(MOCKED_PRODUCT_ENTITY_DATA[0].colors[0]);
        });
    });


    describe('getQuantity() Method Test Suite', () => {
        it('should return the quantity input element', () => {
            productViewTest.render(MOCKED_PRODUCT_ENTITY_DATA[0]);
            const quantityElement = getByRole(document.body, 'spinbutton');
            const selectedQuantity = productViewTest.getQuantity();
            expect(selectedQuantity).toBe(quantityElement);
        });
    });
});