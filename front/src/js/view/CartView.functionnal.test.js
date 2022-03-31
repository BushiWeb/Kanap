/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { CartView } from "./CartView";
import { MOCKED_PRODUCT_ENTITY_DATA } from '../model/mockedProductEntityData';
import { Cart } from '../entity/Cart';
import { CartProduct } from '../entity/CartProduct';


describe('CartView Functionnal Test Suite', () => {
    let cartEntity = new Cart();
    const cartViewTest = new CartView();
    const cartProductEntities = [
        new CartProduct(
            MOCKED_PRODUCT_ENTITY_DATA[0].id,
            MOCKED_PRODUCT_ENTITY_DATA[0].colors[1],
            12,
            MOCKED_PRODUCT_ENTITY_DATA[0].name,
            MOCKED_PRODUCT_ENTITY_DATA[0]
        ),
        new CartProduct(
            MOCKED_PRODUCT_ENTITY_DATA[1].id,
            MOCKED_PRODUCT_ENTITY_DATA[1].colors[1],
            12,
            MOCKED_PRODUCT_ENTITY_DATA[1].name,
            MOCKED_PRODUCT_ENTITY_DATA[1]
        ),
    ]

    beforeEach(() => {
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

    describe('render() Method Test Suite', () => {
        beforeEach(() => {
            cartEntity._totalPrice = undefined;
            cartEntity._totalQuantity = undefined;
        })

        it('should create one product card with the right structure when passed a cart with one product', () => {
            cartEntity.products = [cartProductEntities[0]];
            cartViewTest.render(cartEntity);

            const globalContainer = document.getElementById('cart__items');

            const articleElement = document.getElementsByClassName('cart__item')[0];
            const imageElement = document.querySelector('.cart__item__img img');
            const nameElement = document.querySelector('.cart__item__content__description h2');
            const colorElement = document.querySelectorAll('.cart__item__content__description p')[0];
            const priceElement = document.querySelectorAll('.cart__item__content__description p')[1];
            const quantitySettingElement = document.querySelector('.cart__item__content__settings__quantity .itemQuantity');
            const deleteSettingElement = document.querySelector('.cart__item__content__settings__delete .deleteItem');

            expect(globalContainer).toContainElement(articleElement);
            expect(articleElement).toContainElement(imageElement);
            expect(articleElement).toContainElement(nameElement);
            expect(articleElement).toContainElement(colorElement);
            expect(articleElement).toContainElement(priceElement);
            expect(articleElement).toContainElement(quantitySettingElement);
            expect(articleElement).toContainElement(deleteSettingElement);

            expect(articleElement).toHaveAttribute('data-id', cartProductEntities[0]._id);
            expect(articleElement).toHaveAttribute('data-color', cartProductEntities[0]._color);
            expect(imageElement).toHaveAttribute('src', cartProductEntities[0]._product._imageSource);
            expect(imageElement).toHaveAttribute('alt', cartProductEntities[0]._product._imageAltText);
            expect(nameElement).toHaveTextContent(cartProductEntities[0]._product._name);
            expect(priceElement).toHaveTextContent(cartProductEntities[0]._product._price);
            expect(colorElement).toHaveTextContent(cartProductEntities[0]._color);
        });


        it('should create a list of product cards when passed a cart with multiple products', () => {
            cartEntity.products = cartProductEntities;
            cartViewTest.render(cartEntity);

            const productsCardElement = document.getElementsByTagName('article');
            const priceElt = document.getElementById('totalPrice');
            const quantityElt = document.getElementById('totalQuantity');

            expect(productsCardElement.length).toBe(cartEntity.products.length);
            expect(priceElt.textContent).toBe(cartEntity.totalPrice.toString());
            expect(quantityElt.textContent).toBe(cartEntity.totalQuantity.toString());
        });


        it('should create nothing when passed a cart with no product', () => {
            cartEntity.products = [];
            cartViewTest.render(cartEntity);

            const productsCardElement = document.getElementsByTagName('article');
            const priceElt = document.getElementById('totalPrice');
            const quantityElt = document.getElementById('totalQuantity');

            expect(productsCardElement.length).toBe(0);
            expect(priceElt.textContent).toBe('0');
            expect(quantityElt.textContent).toBe('0');
        });
    });


    describe('insertTotalQuantity() Method Test Suite', () => {
        it('should insert the righ value in the element', () => {
            cartViewTest.insertTotalQuantity(10);

            const quantityElt = document.getElementById('totalQuantity');

            expect(quantityElt.textContent).toBe('10');
        });
    });


    describe('insertTotalPrice() Method Test Suite', () => {
        it('should insert the righ value in the element', () => {
            cartViewTest.insertTotalPrice(10);

            const priceElt = document.getElementById('totalPrice');

            expect(priceElt.textContent).toBe('10');
        });
    });


    describe('insertTotals() Method Test Suite', () => {
        it('should insert the righ values in the elements', () => {
            cartViewTest.insertTotals(10, 10);

            const priceElt = document.getElementById('totalPrice');
            const quantityElt = document.getElementById('totalQuantity');

            expect(priceElt.textContent).toBe('10');
            expect(quantityElt.textContent).toBe('10');
        });
    });
});