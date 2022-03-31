/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { getByLabelText, getByText, queries } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { CartControler } from './CartControler';
import { CONFIG } from '../config/config';
import { MOCKED_API_DATA } from '../dao/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../model/mockedProductEntityData';
import { MOCKED_CART_DATA } from '../model/mockedCartData';

describe('ProductControler Functionnal Test Suite', () => {
    let controlerTest;

    global.fetch = jest.fn().mockImplementation();
    const consoleMock = jest.spyOn(global.console, 'error');
    const alertMock = jest.spyOn(window, 'alert');


    beforeEach(() => {
        controlerTest = new CartControler(CONFIG);
        localStorage.setItem('cart', JSON.stringify(MOCKED_CART_DATA.cartData));

        global.fetch.mockReset();
        consoleMock.mockReset();
        alertMock.mockReset();

        document.body.innerHTML = '';

        let sectionElt = document.createElement('section');
        sectionElt.id = 'cart__items';

        let priceElt = document.createElement('div');
        priceElt.class = 'cart__price';

        let priceParagraphElt = document.createElement('p');
        let priceInline = document.createElement('span');
        priceInline.id = 'totalPrice';
        let quantityIntline = document.createElement('span');
        quantityIntline.id = 'totalQuantity';
        priceParagraphElt.appendChild(quantityIntline);
        priceParagraphElt.appendChild(priceInline);
        priceElt.appendChild(priceParagraphElt);

        document.body.appendChild(sectionElt);
        document.body.appendChild(priceElt);
    });


    describe('initialize() Method Test Suite', () => {
        it('should display the products\' informations and totals', async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            await controlerTest.initialize();

            const articleElements = document.getElementsByClassName('cart__item');
            const articleElement = articleElements[0];
            const imageElement = articleElement.querySelector('.cart__item__img img');
            const nameElement = articleElement.querySelector('.cart__item__content__description h2');
            const colorElement = articleElement.querySelectorAll('.cart__item__content__description p')[0];
            const priceElement = articleElement.querySelectorAll('.cart__item__content__description p')[1];
            const quantitySettingElement = articleElement.querySelector('.cart__item__content__settings__quantity .itemQuantity');
            const deleteSettingElement = articleElement.querySelector('.cart__item__content__settings__delete .deleteItem');
            const priceElt = document.getElementById('totalPrice');
            const quantityElt = document.getElementById('totalQuantity');
            const notificationContainerElt = document.getElementById('notification-container');

            expect(articleElements.length).toBe(MOCKED_CART_DATA.cartData.length - 2);
            expect(priceElt.textContent).toBe(MOCKED_CART_DATA.totalPrice.toString());
            expect(quantityElt.textContent).toBe(MOCKED_CART_DATA.totalQuantity.toString());

            expect(articleElement).toContainElement(imageElement);
            expect(articleElement).toContainElement(nameElement);
            expect(articleElement).toContainElement(colorElement);
            expect(articleElement).toContainElement(priceElement);
            expect(articleElement).toContainElement(quantitySettingElement);
            expect(articleElement).toContainElement(deleteSettingElement);

            expect(articleElement).toHaveAttribute('data-id', MOCKED_API_DATA[0]._id);
            expect(articleElement).toHaveAttribute('data-color', MOCKED_API_DATA[0].colors[0]);
            expect(imageElement).toHaveAttribute('src', MOCKED_API_DATA[0].imageUrl);
            expect(imageElement).toHaveAttribute('alt', MOCKED_API_DATA[0].altTxt);
            expect(nameElement).toHaveTextContent(MOCKED_API_DATA[0].name);
            expect(priceElement).toHaveTextContent(MOCKED_API_DATA[0].price);
            expect(colorElement).toHaveTextContent(MOCKED_API_DATA[0].colors[0]);

            expect(notificationContainerElt).not.toBeNull();
            expect(notificationContainerElt.textContent).toBe(`Les produits false name, false name 2 n'existent pas/plus.`);
            expect(localStorage.getItem('cart')).toBe(JSON.stringify(MOCKED_CART_DATA.cartData.slice(0, -2)));
        });
    });
});