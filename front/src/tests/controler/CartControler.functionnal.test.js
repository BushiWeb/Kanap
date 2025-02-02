/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { CartControler } from '../../js/controler/CartControler';
import { CONFIG_TEST } from '../data/mocked-configuration';
import { MOCKED_API_DATA } from '../data/mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { MOCKED_CART_DATA, MOCKED_CART_ENTITY } from '../data/mockedCartData';
import { MOCKED_ORDER_DATA, MOCKED_ORDER_DATA_RETURNED } from '../data/mockedOrderData';
import { Cart } from '../../js/entity/Cart';

describe('ProductControler Functionnal Test Suite', () => {
    let controlerTest;

    global.fetch = jest.fn().mockImplementation();
    const consoleMock = jest.spyOn(global.console, 'error');
    const alertMock = jest.spyOn(window, 'alert');

    beforeEach(() => {
        controlerTest = new CartControler(CONFIG_TEST);
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

        let formElement = document.createElement('form');
        formElement.method = 'get';
        formElement.classList.add('cart__order__form');

        let firstNameContainerElement = document.createElement('div');
        firstNameContainerElement.classList.add('cart__order__form__question');
        let firstNameLabelElement = document.createElement('label');
        firstNameLabelElement.setAttribute('for', 'firstName');
        firstNameLabelElement.textContent = 'Prénom: ';
        let firstNameInputElement = document.createElement('input');
        firstNameInputElement.type = 'text';
        firstNameInputElement.name = 'firstName';
        firstNameInputElement.id = 'firstName';
        firstNameInputElement.required = true;
        let firstNameErrorElement = document.createElement('p');
        firstNameErrorElement.id = 'firstNameErrorMsg';
        firstNameContainerElement.appendChild(firstNameLabelElement);
        firstNameContainerElement.appendChild(firstNameInputElement);
        firstNameContainerElement.appendChild(firstNameErrorElement);

        let lastNameContainerElement = document.createElement('div');
        lastNameContainerElement.classList.add('cart__order__form__question');
        let lastNameLabelElement = document.createElement('label');
        lastNameLabelElement.setAttribute('for', 'lastName');
        lastNameLabelElement.textContent = 'Nom: ';
        let lastNameInputElement = document.createElement('input');
        lastNameInputElement.type = 'text';
        lastNameInputElement.name = 'lastName';
        lastNameInputElement.id = 'lastName';
        lastNameInputElement.required = true;
        let lastNameErrorElement = document.createElement('p');
        lastNameErrorElement.id = 'lastNameErrorMsg';
        lastNameContainerElement.appendChild(lastNameLabelElement);
        lastNameContainerElement.appendChild(lastNameInputElement);
        lastNameContainerElement.appendChild(lastNameErrorElement);

        let addressContainerElement = document.createElement('div');
        addressContainerElement.classList.add('cart__order__form__question');
        let addressLabelElement = document.createElement('label');
        addressLabelElement.setAttribute('for', 'address');
        addressLabelElement.textContent = 'Adresse: ';
        let addressInputElement = document.createElement('input');
        addressInputElement.type = 'text';
        addressInputElement.name = 'address';
        addressInputElement.id = 'address';
        addressInputElement.required = true;
        let addressErrorElement = document.createElement('p');
        addressErrorElement.id = 'addressErrorMsg';
        addressContainerElement.appendChild(addressLabelElement);
        addressContainerElement.appendChild(addressInputElement);
        addressContainerElement.appendChild(addressErrorElement);

        let cityContainerElement = document.createElement('div');
        cityContainerElement.classList.add('cart__order__form__question');
        let cityLabelElement = document.createElement('label');
        cityLabelElement.setAttribute('for', 'city');
        cityLabelElement.textContent = 'Ville: ';
        let cityInputElement = document.createElement('input');
        cityInputElement.type = 'text';
        cityInputElement.name = 'city';
        cityInputElement.id = 'city';
        cityInputElement.required = true;
        let cityErrorElement = document.createElement('p');
        cityErrorElement.id = 'cityErrorMsg';
        cityContainerElement.appendChild(cityLabelElement);
        cityContainerElement.appendChild(cityInputElement);
        cityContainerElement.appendChild(cityErrorElement);

        let emailContainerElement = document.createElement('div');
        emailContainerElement.classList.add('cart__order__form__question');
        let emailLabelElement = document.createElement('label');
        emailLabelElement.setAttribute('for', 'email');
        emailLabelElement.textContent = 'Email: ';
        let emailInputElement = document.createElement('input');
        emailInputElement.type = 'email';
        emailInputElement.name = 'email';
        emailInputElement.id = 'email';
        emailInputElement.required = true;
        let emailErrorElement = document.createElement('p');
        emailErrorElement.id = 'emailErrorMsg';
        emailContainerElement.appendChild(emailLabelElement);
        emailContainerElement.appendChild(emailInputElement);
        emailContainerElement.appendChild(emailErrorElement);

        let submitContainerElement = document.createElement('div');
        submitContainerElement.classList.add('cart__order__form__submit');
        let submitInputElement = document.createElement('input');
        submitInputElement.type = 'submit';
        submitInputElement.value = 'Commander !';
        submitInputElement.id = 'order';
        submitContainerElement.appendChild(submitInputElement);

        formElement.appendChild(firstNameContainerElement);
        formElement.appendChild(lastNameContainerElement);
        formElement.appendChild(addressContainerElement);
        formElement.appendChild(cityContainerElement);
        formElement.appendChild(emailContainerElement);
        formElement.appendChild(submitContainerElement);

        document.body.appendChild(sectionElt);
        document.body.appendChild(priceElt);
        document.body.appendChild(formElement);
    });

    describe('initialize() Method Test Suite', () => {
        it("should display the products' informations and totals", async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            await controlerTest.initialize();

            const articleElements = document.getElementsByClassName('cart__item');
            const articleElement = articleElements[0];
            const imageElement = articleElement.querySelector('.cart__item__img img');
            const nameElement = articleElement.querySelector('.cart__item__content__description h2');
            const colorElement = articleElement.querySelectorAll('.cart__item__content__description p')[0];
            const priceElement = articleElement.querySelectorAll('.cart__item__content__description p')[1];
            const quantitySettingElement = articleElement.querySelector(
                '.cart__item__content__settings__quantity .itemQuantity'
            );
            const deleteSettingElement = articleElement.querySelector(
                '.cart__item__content__settings__delete .deleteItem'
            );
            const priceElt = document.getElementById('totalPrice');
            const quantityElt = document.getElementById('totalQuantity');

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
            expect(priceElement).toHaveTextContent(MOCKED_API_DATA[0].price + ' €');
            expect(colorElement).toHaveTextContent(MOCKED_API_DATA[0].colors[0]);
        });

        it('should display informations about missing products', async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            await controlerTest.initialize();

            const notificationContainerElt = document.getElementById('notification-container');

            expect(notificationContainerElt).not.toBeNull();
            expect(notificationContainerElt.textContent).toBe(
                `Les produits false name, false name 2 n'existent pas/plus.`
            );
            expect(localStorage.getItem('cart')).toBe(JSON.stringify(MOCKED_CART_DATA.cartData.slice(0, -2)));
        });

        it('should display informations about a single missing products', async () => {
            let cartDataCopy = JSON.parse(JSON.stringify(MOCKED_CART_DATA.cartData));
            localStorage.setItem('cart', JSON.stringify(cartDataCopy.splice(0, cartDataCopy.length - 1)));
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            await controlerTest.initialize();

            const notificationContainerElt = document.getElementById('notification-container');

            expect(notificationContainerElt).not.toBeNull();
            expect(notificationContainerElt.textContent).toBe(`Le produit false name n'existe pas/plus.`);
            expect(localStorage.getItem('cart')).toBe(JSON.stringify(MOCKED_CART_DATA.cartData.slice(0, -2)));
        });
    });

    describe('updateTotals() Method Test Suite', () => {
        it('should update the total DOM elements with the values of the cart', () => {
            const cartTest = MOCKED_CART_ENTITY();
            cartTest.updateTotals();
            controlerTest.cartManager.cart = cartTest;

            controlerTest.updateTotals();

            const totalPriceElt = document.getElementById('totalPrice');
            const totalQuantityElt = document.getElementById('totalQuantity');

            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });
    });

    describe('deleteProductFromCart() Method Test Suite', () => {
        it('should delete the product from the cart and visualy, and update the totals', async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            const cartTest = MOCKED_CART_ENTITY();
            cartTest.updateTotals();
            controlerTest.cartManager.cart = cartTest;
            controlerTest.cartManager.cartComplete = true;
            const idToDelete = cartTest.products[0].id;
            const colorToDelete = cartTest.products[0].color;
            await controlerTest.initialize();

            const articleToDelete = document.querySelector(`[data-id="${idToDelete}"][data-color="${colorToDelete}"]`);

            controlerTest.deleteProductFromCart(idToDelete, colorToDelete);

            const totalPriceElt = document.getElementById('totalPrice');
            const totalQuantityElt = document.getElementById('totalQuantity');

            expect(
                controlerTest.cartManager.cart.products[0].id !== idToDelete ||
                    controlerTest.cartManager.cart.products[0].color !== colorToDelete
            ).toBeTruthy();

            expect(document.body).not.toContainElement(articleToDelete);

            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });
    });

    describe('updateProductQuantity() Method Test Suite', () => {
        let cartTest, idToUpdate, colorToUpdate, totalPriceElt, totalQuantityElt;

        beforeEach(async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            cartTest = MOCKED_CART_ENTITY();
            cartTest.updateTotals();

            controlerTest.cartManager.cart = cartTest;
            controlerTest.cartManager.cartComplete = true;

            idToUpdate = cartTest.products[0].id;
            colorToUpdate = cartTest.products[0].color;

            await controlerTest.initialize();

            totalPriceElt = document.getElementById('totalPrice');
            totalQuantityElt = document.getElementById('totalQuantity');
        });

        it('should delete the product from the cart and visualy, and update the totals, if the quantity is 0', async () => {
            const articleToDelete = document.querySelector(`[data-id="${idToUpdate}"][data-color="${colorToUpdate}"]`);
            controlerTest.updateProductQuantity(idToUpdate, colorToUpdate, 0);

            expect(
                controlerTest.cartManager.cart.products[0].id !== idToUpdate ||
                    controlerTest.cartManager.cart.products[0].color !== colorToUpdate
            ).toBeTruthy();
            expect(document.body).not.toContainElement(articleToDelete);
            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });

        it("should update the product's quantity and update the totals if the quantity is greater than 0", async () => {
            controlerTest.updateProductQuantity(idToUpdate, colorToUpdate, 1);
            expect(controlerTest.cartManager.cart.products[0].quantity === 1).toBeTruthy();
            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });
    });

    describe('submitOrder() Method Test Suite', () => {
        const cartUrl = 'http://localhost/cart.html';
        delete window.location;
        window.location = new URL(cartUrl);
        window.location.assign = function (url) {
            this.href = url;
        };

        const orderData = MOCKED_ORDER_DATA();
        const returnedOrderData = MOCKED_ORDER_DATA_RETURNED();

        beforeEach(() => {
            delete window.location;
            window.location = new URL(cartUrl);
            window.location.assign = function (url) {
                this.href = url;
            };
        });

        it('should send the data to the API', async () => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact: orderData.contact, products: orderData.products }),
            };
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(returnedOrderData),
                ok: true,
            });
            await controlerTest.submitOrder(orderData.contact, orderData.products);
            expect(global.fetch).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/products/order', fetchOptions);
        });

        it('should redirect the user to the confirmation page', async () => {
            global.fetch.mockResolvedValueOnce({
                json: () => Promise.resolve(returnedOrderData),
                ok: true,
            });
            await controlerTest.submitOrder(orderData.contact, orderData.products);
            expect(window.location.href).toMatch(/.*\/confirmation\.html\?orderId=123/);
        });

        it('should display an error if the request fails', async () => {
            global.fetch.mockRejectedValueOnce(new Error());
            await controlerTest.submitOrder(orderData.contact, orderData.products);
            expect(alertMock).toHaveBeenCalled();
            expect(consoleMock).toHaveBeenCalled();
        });

        it('should display an error if the request send an error status', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Error',
            });
            await controlerTest.submitOrder(orderData.contact, orderData.products);
            expect(alertMock).toHaveBeenCalled();
            expect(consoleMock).toHaveBeenCalled();
        });
    });

    describe('deleteProductFromCart Event Test Suite', () => {
        it('should delete the product from the cart and visualy, and update the totals', async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            const cartTest = MOCKED_CART_ENTITY();
            cartTest.updateTotals();
            controlerTest.cartManager.cart = cartTest;
            controlerTest.cartManager.cartComplete = true;
            const idToDelete = cartTest.products[0].id;
            const colorToDelete = cartTest.products[0].color;
            await controlerTest.initialize();

            const articleToDelete = document.querySelector(`[data-id="${idToDelete}"][data-color="${colorToDelete}"]`);
            const deleteButton = articleToDelete.getElementsByClassName('deleteItem')[0];

            userEvent.click(deleteButton);

            const totalPriceElt = document.getElementById('totalPrice');
            const totalQuantityElt = document.getElementById('totalQuantity');

            expect(
                controlerTest.cartManager.cart.products[0].id !== idToDelete ||
                    controlerTest.cartManager.cart.products[0].color !== colorToDelete
            ).toBeTruthy();

            expect(document.body).not.toContainElement(articleToDelete);

            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });
    });

    describe('updateProductQuantity Event Test Suite', () => {
        let cartTest, idToUpdate, colorToUpdate, articleToUpdate, quantityInput;

        beforeEach(async () => {
            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            cartTest = MOCKED_CART_ENTITY();
            cartTest.updateTotals();

            controlerTest.cartManager.cart = cartTest;
            controlerTest.cartManager.cartComplete = true;

            idToUpdate = cartTest.products[0].id;
            colorToUpdate = cartTest.products[0].color;

            await controlerTest.initialize();

            articleToUpdate = document.querySelector(`[data-id="${idToUpdate}"][data-color="${colorToUpdate}"]`);
            quantityInput = articleToUpdate.getElementsByClassName('itemQuantity')[0];
        });

        it('should add an error message if the value is invalid', async () => {
            quantityInput.value = '-1';
            fireEvent['change'](quantityInput);
            expect(quantityInput.nextElementSibling).toHaveClass('error');
        });

        it('should remove the error if the value is valid', async () => {
            quantityInput.value = '-1';
            fireEvent['change'](quantityInput);
            quantityInput.value = '1';
            fireEvent['change'](quantityInput);
            expect(
                quantityInput.nextElementSibling === null ||
                    !quantityInput.nextElementSibling.classList.contains('error')
            ).toBeTruthy();
        });

        it("should update the product's quantity and update the totals if the quantity is greater than 0", async () => {
            quantityInput.value = '1';
            fireEvent['change'](quantityInput);

            const totalPriceElt = document.getElementById('totalPrice');
            const totalQuantityElt = document.getElementById('totalQuantity');

            expect(controlerTest.cartManager.cart.products[0].quantity === 1).toBeTruthy();
            expect(totalPriceElt.textContent).toBe(controlerTest.cartManager.cart.totalPrice.toString());
            expect(totalQuantityElt.textContent).toBe(controlerTest.cartManager.cart.totalQuantity.toString());
        });
    });

    describe('submitOrder Event Test Suite', () => {
        const cartUrl = 'http://localhost/cart.html';
        delete window.location;
        window.location = new URL(cartUrl);
        window.location.assign = function (url) {
            this.href = url;
        };

        const orderData = MOCKED_ORDER_DATA();
        let firstNameInput, lastNameInput, emailInput, addressInput, cityInput, submitInput;
        const mockSubmitOrder = jest.spyOn(CartControler.prototype, 'submitOrder');

        beforeEach(async () => {
            mockSubmitOrder.mockReset();

            delete window.location;
            window.location = new URL(cartUrl);
            window.location.assign = function (url) {
                this.href = url;
            };

            controlerTest.productManager.productsListComplete = true;
            controlerTest.productManager.products = MOCKED_PRODUCT_ENTITY_DATA;

            await controlerTest.initialize();

            firstNameInput = document.getElementById('firstName');
            lastNameInput = document.getElementById('lastName');
            addressInput = document.getElementById('address');
            cityInput = document.getElementById('city');
            emailInput = document.getElementById('email');
            submitInput = document.getElementById('order');
        });

        it('should display errors if the form is invalid', async () => {
            firstNameInput.value = 'Bruce-';
            lastNameInput.value = 'Wayne';
            addressInput.value = 'Wayne Manor';
            cityInput.value = 'Gotham  City';
            emailInput.value = 'iamnotbatmanoracle.bat';

            userEvent.click(submitInput);

            expect(firstNameInput.nextElementSibling.textContent).not.toBe('');
            expect(lastNameInput.nextElementSibling.textContent).toBe('');
            expect(emailInput.nextElementSibling.textContent).not.toBe('');
            expect(addressInput.nextElementSibling.textContent).toBe('');
            expect(cityInput.nextElementSibling.textContent).not.toBe('');
        });

        it('should display errors if the form is corrected but sill invalid', async () => {
            firstNameInput.value = 'Bruce-';
            lastNameInput.value = 'Wayne';
            addressInput.value = 'Wayne Manor';
            cityInput.value = 'Gotham  City';
            emailInput.value = 'iamnotbatmanoracle.bat';

            userEvent.click(submitInput);

            firstNameInput.value = 'Bruce';
            lastNameInput.value = 'Wayn1e';
            addressInput.value = 'Wayne Manor';
            cityInput.value = 'Gotham City';
            emailInput.value = 'iamnotbatman@';

            userEvent.click(submitInput);

            expect(firstNameInput.nextElementSibling.textContent).toBe('');
            expect(lastNameInput.nextElementSibling.textContent).not.toBe('');
            expect(emailInput.nextElementSibling.textContent).not.toBe('');
            expect(addressInput.nextElementSibling.textContent).toBe('');
            expect(cityInput.nextElementSibling.textContent).toBe('');
        });

        it('should call submitOrder()', async () => {
            firstNameInput.value = orderData.contact.firstName;
            lastNameInput.value = orderData.contact.lastName;
            addressInput.value = orderData.contact.address;
            cityInput.value = orderData.contact.city;
            emailInput.value = orderData.contact.email;

            userEvent.click(submitInput);

            expect(mockSubmitOrder).toHaveBeenCalled();
            expect(mockSubmitOrder).toHaveBeenCalledWith(orderData.contact, orderData.products);
        });

        it('should reset the cart', async () => {
            firstNameInput.value = orderData.contact.firstName;
            lastNameInput.value = orderData.contact.lastName;
            addressInput.value = orderData.contact.address;
            cityInput.value = orderData.contact.city;
            emailInput.value = orderData.contact.email;

            userEvent.click(submitInput);

            expect(controlerTest.cartManager.cart).toEqual(new Cart());
            expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
        });

        it('should display a notification and return if the cart is empty', async () => {
            firstNameInput.value = orderData.contact.firstName;
            lastNameInput.value = orderData.contact.lastName;
            addressInput.value = orderData.contact.address;
            cityInput.value = orderData.contact.city;
            emailInput.value = orderData.contact.email;

            controlerTest.cartManager.cart = new Cart();

            userEvent.click(submitInput);

            const notificationContainerElt = document.getElementById('notification-container');
            expect(notificationContainerElt).not.toBeNull();
            expect(mockSubmitOrder).not.toHaveBeenCalled();
        });
    });
});
