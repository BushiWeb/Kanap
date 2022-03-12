/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { HomeView } from "./HomeView";
import { MOCKED_API_DATA } from "../api/mockedApiData";


describe('HomeView Unit Test Suite', () => {
    const homeViewTest = new HomeView();

    beforeEach(() => {
        document.body.innerHTML = '';
        let sectionElt = document.createElement('section');
        sectionElt.id = 'items';
        document.body.appendChild(sectionElt);
    });

    describe('render() Method Test Suite', () => {
        it('should create one product card with the right structure when passed one product', () => {
            homeViewTest.render([MOCKED_API_DATA[0]]);

            const nameElement = document.getElementsByClassName('productName');
            const descriptionElement = document.getElementsByClassName('productDescription');
            const linkWrapperElement = document.getElementsByTagName('a');
            const imageElement = document.getElementsByTagName('img');

            expect(document.body).toContainElement(linkWrapperElement[0]);
            expect(linkWrapperElement[0]).toContainElement(nameElement[0]);
            expect(linkWrapperElement[0]).toContainElement(descriptionElement[0]);
            expect(linkWrapperElement[0]).toContainElement(imageElement[0]);

            expect(nameElement[0]).toHaveTextContent(MOCKED_API_DATA[0].name);
            expect(descriptionElement[0]).toHaveTextContent(MOCKED_API_DATA[0].description);
            expect(linkWrapperElement[0]).toHaveAttribute('href', './product.html?id=' + MOCKED_API_DATA[0]._id);
            expect(imageElement[0]).toHaveAttribute('src', MOCKED_API_DATA[0].imageUrl);
            expect(imageElement[0]).toHaveAttribute('alt', MOCKED_API_DATA[0].altTxt);
        });


        it('should create a list of product cards when passed multiple products', () => {
            homeViewTest.render(MOCKED_API_DATA);
            const productsCardElement = document.getElementsByTagName('a');
            expect(productsCardElement.length).toBe(MOCKED_API_DATA.length);
        });


        it('should create nothing when passed no product', () => {
            homeViewTest.render([]);
            const productsCardElement = document.getElementsByTagName('a');
            expect(productsCardElement.length).toBe(0);
        });
    });
});