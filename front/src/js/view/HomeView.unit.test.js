/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { HomeView } from "./HomeView";
import { MOCKED_API_DATA } from "../api/mockedApiData";


describe('HomeView Unit Test Suite', () => {
    const homeViewTest = new HomeView();

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('render() Method Test Suite', () => {
        it('should create one product card with the right structure when passed one product', () => {
            homeViewTest.render([MOCKED_API_DATA[0]], 'body');
            const nameElement = document.getElementsByClassName('productName');
            const descriptionElement = document.getElementsByClassName('productDescription');
            const linkWrapperElement = document.getElementsByTagName('a');
            expect(document.body).toContainElement(linkWrapperElement[0]);
            expect(linkWrapperElement[0]).toContainElement(nameElement[0]);
            expect(linkWrapperElement[0]).toContainElement(descriptionElement[0]);
            expect(nameElement[0]).not.toBeEmptyDOMElement();
            expect(descriptionElement[0]).not.toBeEmptyDOMElement();
        });


        it('should create a list of product cards when passed multiple products and return the number of elements created', () => {
            const renderResult = homeViewTest.render(MOCKED_API_DATA, 'body');
            const productsCardElement = document.getElementsByTagName('a');
            expect(renderResult).toBe(MOCKED_API_DATA.length);
            expect(productsCardElement.length).toBe(MOCKED_API_DATA.length);
        });


        it('should create nothing when passed no product and return 0', () => {
            const renderResult = homeViewTest.render([], 'body');
            const productsCardElement = document.getElementsByTagName('a');
            expect(renderResult).toBe(0);
            expect(productsCardElement.length).toBe(0);
        });


        it('should return -1 and print an error if the container does not exist', () => {
            const consoleMock = jest.spyOn(global.console, 'error').mockImplementationOnce();
            consoleMock.mockReset();
            let renderResult = homeViewTest.render([], 'false');
            expect(renderResult).toBe(-1);
            expect(consoleMock).toHaveBeenCalled();
        });
    });
});