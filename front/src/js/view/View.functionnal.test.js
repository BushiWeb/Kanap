/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';


import { View } from "./View";


let testView = new View();


describe('View Functionnal Test Suite', () => {
    describe('alert() Method Test Suite', () => {
        const alertMock = jest.spyOn(window, 'alert');

        beforeEach(() => {
            alertMock.mockReset();
        });

        it('should call the window.alert() function with the right parameter', () => {
            const testArgument = 'Hello world !';
            testView.alert(testArgument);
            expect(alertMock).toHaveBeenCalled();
            expect(alertMock).toHaveBeenCalledWith(testArgument);
        });
    });



    describe('createElement() Method Test Suite', () => {
        it('should create a paragraph element', () => {
            const testElement = testView.createElement('p');
            expect(testElement).toBeInstanceOf(HTMLParagraphElement);
        });

        it('should create an text input element with a name, an id and a class', () => {
            const testAttributes = {
                class: 'input',
                id: 'testInput',
                name: 'testInput',
                type: 'text'
            };
            const testElement = testView.createElement('input', testAttributes);
            expect(testElement).toHaveAttribute('name', 'testInput');
            expect(testElement).toHaveAttribute('type', 'text');
            expect(testElement).toHaveAttribute('id', 'testInput');
            expect(testElement).toHaveClass('input');
        });
    });


    describe('getElements() Method Test Suite', () => {
        const testElement = document.createElement('li');
        const testElementSibling = document.createElement('li');
        const testElementParent = document.createElement('ul');
        testElementParent.appendChild(testElementSibling);
        testElementParent.appendChild(testElement);
        document.body.appendChild(testElementParent);

        it('should return the elements corresponding to the CSS selector', () => {
            const selectedElements = testView.getElements('ul li:last-child');
            expect(selectedElements).toContain(testElement);
        });

        it('should return an array of selected elements', () => {
            const selectedElements = testView.getElements('ul li');
            expect(selectedElements.length).toBe(2);
        });

        it('should return an empty array if no elements are selected', () => {
            const selectedElements = testView.getElements('h1');
            expect(Array.isArray(selectedElements)).toBe(true);
            expect(selectedElements.length).toBe(0);
        });
    });


    describe('displayNotifications() Method Test Suite', () => {
        beforeEach(() => {
            document.body.innerHTML = '';
        });

        it('should create a notification container with the right text and append it to the body', () => {
            testView.displayNotification('test');
            const notificationContainerElt = document.getElementById('notification-container');
            expect(notificationContainerElt).not.toBeNull();
            expect(notificationContainerElt.textContent).toBe('test');
        });

        it('should change the text of the notification container and append it to the body, if the container already exists', () => {
            const notificationContainerBase = document.createElement('p');
            notificationContainerBase.id = 'notification-container';
            notificationContainerBase.textContent = 'previousText';
            testView.displayNotification('test');
            const notificationContainerElt = document.querySelectorAll('#notification-container');
            expect(notificationContainerElt.length).toBe(1);
            expect(notificationContainerElt[0].textContent).toBe('test');
        });
    });


    describe('createFormFieldError() Method Test Suite', () => {
        const inputElt = document.createElement('input');
        inputElt.type = 'text';
        inputElt.id = 'form-field';

        const inputContainer = document.createElement('div');
        inputContainer.id = 'container_form-field';

        const numberElt = document.createElement('input');
        numberElt.type = 'number';
        numberElt.id = 'numberField';

        const numberContainer = document.createElement('div');
        numberContainer.id = 'container_number-field';

        beforeEach(() => {
            document.body.innerHTML = '';

            inputContainer.innerHTML = '';
            numberContainer.innerHTML = '';
            inputContainer.appendChild(inputElt);
            numberContainer.appendChild(numberElt);

            document.body.appendChild(inputContainer);
            document.body.appendChild(numberContainer);
        });

        it('should create an error paragraph and place it next to the form field', () => {
            testView.createFormFieldError(inputElt, 'test');

            const errorContainers = document.getElementsByClassName('error');

            expect(errorContainers.length).toBe(1);
            expect(errorContainers[0].previousElementSibling).toBe(inputElt);
            expect(errorContainers[0].textContent).toBe('test');
        });

        it('should create an error paragraph and place it next to the form field if the form field is not the last element of it\'s parent', () => {
            const lastElement = document.createElement('p');
            inputContainer.appendChild(lastElement);

            testView.createFormFieldError(inputElt, 'test');
            const errorContainers = document.getElementsByClassName('error');

            expect(errorContainers.length).toBe(1);
            expect(errorContainers[0].previousElementSibling).toBe(inputElt);
            expect(errorContainers[0].nextElementSibling).toBe(lastElement);
            expect(errorContainers[0].textContent).toBe('test');
        });

        it('should change the error message if the error already exists', () => {
            const initialError = document.createElement('p');
            initialError.classList.add('error');
            initialError.textContent = 'previousError';

            testView.createFormFieldError(inputElt, 'test');
            const errorContainers = document.getElementsByClassName('error');

            expect(errorContainers.length).toBe(1);
            expect(errorContainers[0].previousElementSibling).toBe(inputElt);
            expect(errorContainers[0].textContent).toBe('test');
        });
    });


    describe('deleteFormFieldError() Method Test Suite', () => {
        const inputElt = document.createElement('input');
        inputElt.type = 'text';
        inputElt.id = 'form-field';

        const inputError = document.createElement('p');
        inputError.classList.add('error');
        inputError.textContent = 'erreur input';

        const inputContainer = document.createElement('div');
        inputContainer.id = 'container_form-field';

        const numberElt = document.createElement('input');
        numberElt.type = 'number';
        numberElt.id = 'numberField';

        const numberError = document.createElement('p');
        numberError.classList.add('error');
        numberError.textContent = 'erreur input';

        const numberContainer = document.createElement('div');
        numberContainer.id = 'container_number-field';

        beforeEach(() => {
            document.body.innerHTML = '';

            inputContainer.innerHTML = '';
            numberContainer.innerHTML = '';
            inputContainer.appendChild(inputElt);
            inputContainer.appendChild(inputError);
            numberContainer.appendChild(numberElt);
            numberContainer.appendChild(numberError);

            document.body.appendChild(inputContainer);
            document.body.appendChild(numberContainer);
        });

        it('should delete the error paragraph next to the form field', () => {
            testView.deleteFormFieldError(inputElt);

            expect(inputError).not.toBeInTheDocument();
            expect(numberError).toBeInTheDocument();
        });
    });
});
