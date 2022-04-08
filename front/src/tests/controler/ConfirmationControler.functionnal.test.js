/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { ConfirmationControler } from '../../js/controler/ConfirmationControler';

describe('ConfirmationControler Functionnal Test Suite', () => {
    const testUrl = 'http://localhost/confirmation.html?orderId=123';
    delete window.location;
    window.location = new URL(testUrl);
    let controlerTest;

    const consoleMock = jest.spyOn(global.console, 'error');
    const alertMock = jest.spyOn(window, 'alert');

    beforeEach(() => {
        window.location.href = testUrl;
        controlerTest = new ConfirmationControler();

        consoleMock.mockReset();
        alertMock.mockReset();

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

    describe('initialize() Method Test Suite', () => {
        it("should display the product's informations", () => {
            controlerTest.initialize();

            const orderIdElement = document.getElementById('orderId');

            expect(orderIdElement).toHaveTextContent('123');
        });

        it('should alert and print an error if there is no order id in the url', async () => {
            window.location.href = testUrl.replace(/\?orderId=.*$/, '');
            const controlerTestUrlError = new ConfirmationControler();

            controlerTestUrlError.initialize();

            expect(consoleMock).toHaveBeenCalled();
            expect(alertMock).toHaveBeenCalled();
        });
    });
});
