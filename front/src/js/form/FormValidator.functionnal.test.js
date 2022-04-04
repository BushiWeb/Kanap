/**
 * @jest-environment jsdom
 */

import { FormValidator } from './FormValidator';

const formElt = document.createElement('form');

const nameInputElt = document.createElement('input');
nameInputElt.name = 'name';
nameInputElt.type = 'text';
nameInputElt.required = true;

const secondNameInputElt = document.createElement('input');
secondNameInputElt.name = 'secondName';
secondNameInputElt.type = 'text';

const firstNameInputElt = document.createElement('input');
firstNameInputElt.name = 'firstName';
firstNameInputElt.type = 'text';

const lastNameInputElt = document.createElement('input');
lastNameInputElt.name = 'lastName';
lastNameInputElt.type = 'text';

const cityInputElt = document.createElement('input');
cityInputElt.name = 'city';
cityInputElt.type = 'text';

const emailInputElt = document.createElement('input');
emailInputElt.name = 'email';
emailInputElt.type = 'email';
emailInputElt.required = true;

const experienceElt = document.createElement('input');
experienceElt.name = 'experience';
experienceElt.type = 'number';
experienceElt.min = 0;
experienceElt.max = 30;

const childElt = document.createElement('input');
childElt.name = 'child';
childElt.type = 'number';
childElt.required = true;
childElt.min = 0;

const genderElt = document.createElement('select');
genderElt.required = true;
const nullOption = document.createElement('option');
const maleOption = document.createElement('option');
maleOption.value = 'male';
const femaleOption = document.createElement('option');
femaleOption.value = 'female';
genderElt.appendChild(nullOption);
genderElt.appendChild(maleOption);
genderElt.appendChild(femaleOption);

formElt.appendChild(nameInputElt);
formElt.appendChild(secondNameInputElt);
formElt.appendChild(firstNameInputElt);
formElt.appendChild(lastNameInputElt);
formElt.appendChild(cityInputElt);
formElt.appendChild(emailInputElt);
formElt.appendChild(experienceElt);
formElt.appendChild(childElt);
formElt.appendChild(genderElt);

describe('FormValidator Functionnal Test Suite', () => {
    it('should return an array of validation, all fields invalid exept the second name', () => {
        nameInputElt.value = '';
        secondNameInputElt.value = '';
        firstNameInputElt.value = '--Fred';
        lastNameInputElt.value = 'Doe2';
        cityInputElt.value = 'Saint--Etienne';
        emailInputElt.value = 'ishigo.kurosaki';
        experienceElt.value = '40';
        childElt.value = '';
        nullOption.selected = true;

        const validationResult = FormValidator.validateForm(formElt);

        expect(validationResult.name).toMatch(/.+/);
        expect(validationResult.secondName).toBe('');
        expect(validationResult.firstName).toMatch(/.+/);
        expect(validationResult.lastName).toMatch(/.+/);
        expect(validationResult.city).toMatch(/.+/);
        expect(validationResult.email).toMatch(/.+/);
        expect(validationResult.experience).toMatch(/.+/);
        expect(validationResult.child).toMatch(/.+/);
    });

    it('should return an array of validation, all fields valid', () => {
        nameInputElt.value = 'Name';
        secondNameInputElt.value = 'SecondName';
        firstNameInputElt.value = 'Fred-Ivan';
        lastNameInputElt.value = 'Dupetitlou';
        cityInputElt.value = 'Saint-Etienne';
        emailInputElt.value = 'name@domain.com';
        experienceElt.value = '15';
        childElt.value = '3';
        maleOption.selected = true;

        const validationResult = FormValidator.validateForm(formElt);

        expect(validationResult.name).toBe('');
        expect(validationResult.secondName).toBe('');
        expect(validationResult.firstName).toBe('');
        expect(validationResult.lastName).toBe('');
        expect(validationResult.city).toBe('');
        expect(validationResult.email).toBe('');
        expect(validationResult.experience).toBe('');
        expect(validationResult.child).toBe('');
    });
});
