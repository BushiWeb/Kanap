/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { View } from "./View";

let testView;

beforeEach(() => {
    testView = new View();
});

describe('View.alert() Method Fonctionnal Test Suite', () => {
    let alertMock;

    beforeAll(() => {
        alertMock = jest.spyOn(window, 'alert').mockImplementation();
    })

    it('should call the window.alert() function', () => {
        testView.alert('Message de test');
        expect(alertMock).toHaveBeenCalled();
    });

    it('should call the window.alert() function with the right parameter', () => {
        const testArgument = 'Hello world !';
        testView.alert(testArgument);
        expect(alertMock).toHaveBeenCalledWith(testArgument);
    });
});



describe('View..createElement() Method Fonctionnal Test Suite', () => {
    it('should create a paragraph element', () => {
        const testElement = testView.createElement('p');
        expect(testElement).toBeInstanceOf(HTMLParagraphElement)
    });

    it('should create an text input element with a name, an id and a class', () => {
        const testAttributes = {
            class: 'input',
            id: 'testInput',
            name: 'testInput',
            type: 'text'
        }
        const testElement = testView.createElement('input', testAttributes);
        expect(testElement).toHaveAttribute('name', 'testInput');
        expect(testElement).toHaveAttribute('type', 'text');
        expect(testElement).toHaveAttribute('id', 'testInput');
        expect(testElement).toHaveClass('input');
    });
});



describe('View.getElements() Method Fonctionnal Test Suite', () => {
    it('should return the element with the right id', () => {
        const testElement = document.createElement('p');
        testElement.id = 'testId';
        document.body.append(testElement);

        const selectedElements = testView.getElements('#testId');
        expect(selectedElements).toContain(testElement);
    });


    it('should return the elements with the right class', () => {
        const testElement = document.createElement('p');
        const testElement2 = document.createElement('p');
        testElement.classList.add('testClass');
        testElement2.classList.add('testClass');
        document.body.append(testElement);
        document.body.append(testElement2);

        const selectedElements = testView.getElements('.testClass');
        expect(selectedElements).toContain(testElement);
        expect(selectedElements).toContain(testElement2);
    });


    it('should return the elements depending on the CSS selector', () => {
        const testElement = document.createElement('li');
        const testElementSibling = document.createElement('li');
        const testElementParent = document.createElement('ul');
        testElementParent.appendChild(testElementSibling);
        testElementParent.appendChild(testElement);
        document.body.appendChild(testElementParent);

        const selectedElements = testView.getElements('ul li:last-child');
        expect(selectedElements).toContain(testElement);
    });
})