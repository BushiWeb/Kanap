/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { ConfirmationView } from './ConfirmationView';

describe('ProductView Functionnal Test Suite', () => {
    const productViewTest = new ConfirmationView();

    beforeEach(() => {
        document.body.innerHTML = '';

        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('confirmation');

        const paragraphElement = document.createElement('p');
        const orderIdElement = document.createElement('span');
        orderIdElement.id = 'orderId';
        paragraphElement.appendChild(orderIdElement);

        wrapperElement.appendChild(paragraphElement);

        document.body.appendChild(wrapperElement);
    });

    describe('render() Method Test Suite', () => {
        it('should insert the order id', () => {
            productViewTest.render('123');

            const orderIdElement = document.getElementById('orderId');

            expect(orderIdElement).toHaveTextContent('123');
        });
    });
});
