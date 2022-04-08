/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { CartView } from '../../js/view/CartView';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';
import { Cart } from '../../js/entity/Cart';
import { CartProduct } from '../../js/entity/CartProduct';
import { fireEvent } from '@testing-library/dom';

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
    ];

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

    describe('render() Method Test Suite', () => {
        beforeEach(() => {
            cartEntity._totalPrice = undefined;
            cartEntity._totalQuantity = undefined;
        });

        it('should create one product card with the right structure when passed a cart with one product', () => {
            cartEntity.products = [cartProductEntities[0]];
            cartViewTest.render(cartEntity);

            const globalContainer = document.getElementById('cart__items');

            const articleElement = document.getElementsByClassName('cart__item')[0];
            const imageElement = document.querySelector('.cart__item__img img');
            const nameElement = document.querySelector('.cart__item__content__description h2');
            const colorElement = document.querySelectorAll('.cart__item__content__description p')[0];
            const priceElement = document.querySelectorAll('.cart__item__content__description p')[1];
            const quantitySettingElement = document.querySelector(
                '.cart__item__content__settings__quantity .itemQuantity'
            );
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
            expect(priceElement).toHaveTextContent(cartProductEntities[0]._product._price + ' €');
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

        it('should create a notification if messages are given', () => {
            cartEntity.products = cartProductEntities;
            const message = 'Message';
            cartViewTest.render(cartEntity, message);

            const notificationContainerElt = document.getElementById('notification-container');
            expect(notificationContainerElt).not.toBeNull();
            expect(notificationContainerElt.textContent).toBe(message);
        });

        it("shouldn't create any notification if no messsages are given", () => {
            cartEntity.products = cartProductEntities;
            cartViewTest.render(cartEntity, '');

            const notificationContainerElt = document.getElementById('notification-container');
            expect(notificationContainerElt).toBeNull();
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

    describe('removeProductFromDom() Method Test Suite', () => {
        const idToDelete = '123';
        const colorToDelete = 'blue';

        beforeEach(() => {
            const cardContainer = document.getElementById('cart__items');

            const articleToDelete = document.createElement('article');
            articleToDelete.dataset.id = idToDelete;
            articleToDelete.dataset.color = colorToDelete;

            const articleSameId = document.createElement('article');
            articleSameId.dataset.id = idToDelete;
            articleSameId.dataset.color = 'black';

            const articleSameColor = document.createElement('article');
            articleSameColor.dataset.id = '7777';
            articleSameColor.dataset.color = colorToDelete;

            const articleDifferent = document.createElement('article');
            articleDifferent.dataset.id = '12345';
            articleDifferent.dataset.color = 'red';

            cardContainer.appendChild(articleDifferent);
            cardContainer.appendChild(articleSameColor);
            cardContainer.appendChild(articleSameId);
            cardContainer.appendChild(articleToDelete);
        });

        it('should remove the product cart corresponding to the right ID and color', () => {
            cartViewTest.removeProductFromDom(idToDelete, colorToDelete);

            const articleElements = document.getElementsByTagName('article');

            expect(articleElements.length).toBe(3);

            for (let articleElement of articleElements) {
                const difference = expect(
                    articleElement.dataset.id !== idToDelete || articleElement.dataset.color !== colorToDelete
                ).toBe(true);
            }
        });
    });

    describe('displayContactFormError() Method Test Suite', () => {
        const errorObject = {
            lastName: 'Cet élément est obligatoire',
            email: "Cet élément doit avoir le format d'un email",
        };
        const errorObject2 = {
            firstName: 'Cet élément est obligatoire',
            city: 'Cet élément ne doit pas contenir de chiffre',
        };

        it('should insert error messages underneath invalid form fields', () => {
            cartViewTest.displayContactFormError(errorObject);

            expect(document.getElementById('firstNameErrorMsg').textContent).toBe('');
            expect(document.getElementById('lastNameErrorMsg').textContent).toBe(errorObject.lastName);
            expect(document.getElementById('addressErrorMsg').textContent).toBe('');
            expect(document.getElementById('cityErrorMsg').textContent).toBe('');
            expect(document.getElementById('emailErrorMsg').textContent).toBe(errorObject.email);
        });

        it('should insert error messages underneath invalid form fields only when the form is modified', () => {
            cartViewTest.displayContactFormError(errorObject);
            cartViewTest.displayContactFormError(errorObject2);

            expect(document.getElementById('firstNameErrorMsg').textContent).toBe(errorObject2.firstName);
            expect(document.getElementById('lastNameErrorMsg').textContent).toBe('');
            expect(document.getElementById('addressErrorMsg').textContent).toBe('');
            expect(document.getElementById('cityErrorMsg').textContent).toBe(errorObject2.city);
            expect(document.getElementById('emailErrorMsg').textContent).toBe('');
        });
    });

    describe('addDeleteProductEventListener() Method Test Suite', () => {
        it('should execute the callback function when the button is clicked', () => {
            const buttonElement = document.createElement('button');
            buttonElement.type = 'button';
            buttonElement.classList.add('deleteItem');
            document.body.appendChild(buttonElement);

            let clickResult = false;

            cartViewTest.addDeleteProductEventListener(() => {
                clickResult = true;
            });

            userEvent.click(buttonElement);
            expect(clickResult).toBeTruthy();
        });
    });

    describe('addUpdateProductQuantityEventHandler() Method Test Suite', () => {
        it('should execute the callback function when the button is clicked', () => {
            const numberElement = document.createElement('input');
            numberElement.type = 'number';
            numberElement.classList.add('itemQuantity');
            document.body.appendChild(numberElement);

            let clickResult = 0;

            cartViewTest.addUpdateProductQuantityEventListener((e) => {
                clickResult = e.target.value;
            });

            numberElement.value = '4';
            fireEvent['change'](numberElement);
            expect(clickResult).toBe('4');
        });
    });

    describe('addSubmitOrderFormEventHandler() Method Test Suite', () => {
        it('should execute the callback function when the button is clicked', () => {
            const numberElement = document.createElement('input');
            numberElement.type = 'number';
            numberElement.classList.add('itemQuantity');
            document.body.appendChild(numberElement);

            let submitResult = false;

            cartViewTest.addSubmitOrderFormEventListener((e) => {
                submitResult = true;
                e.preventDefault();
            });

            let formElement = document.getElementsByClassName('cart__order__form')[0];

            fireEvent['submit'](formElement);
            expect(submitResult).toBeTruthy();
        });
    });
});
