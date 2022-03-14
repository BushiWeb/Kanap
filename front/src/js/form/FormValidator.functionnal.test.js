/**
 * @jest-environment jsdom
 */

import { FormValidator } from "./FormValidator";

const formElt = document.createElement('form');

const nameInputElt = document.createElement('input');
nameInputElt.type = 'text';
nameInputElt.required = true;

const secondNameInputElt = document.createElement('input');
secondNameInputElt.type = 'text';

const emailInputElt = document.createElement('input');
emailInputElt.type = 'email';
emailInputElt.required = true;

const experienceElt = document.createElement('input');
experienceElt.type = 'number';
experienceElt.min = 0;
experienceElt.max = 30;

const childElt = document.createElement('input');
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
formElt.appendChild(emailInputElt);
formElt.appendChild(experienceElt);
formElt.appendChild(childElt);
formElt.appendChild(genderElt);

describe('FormValidator Functionnal Test Suite', () => {
    it ('should return an array of validation, all fields invalid exept the second name', () => {
        nameInputElt.value = '';
        secondNameInputElt.value = '';
        emailInputElt.value = '';
        experienceElt.value = '40';
        childElt.value = '';
        nullOption.selected = true;

        const validationResult = FormValidator.validateForm(formElt);

        expect(validationResult[0].valid).toBe(false);
        expect(validationResult[1].valid).toBe(true);
        expect(validationResult[2].valid).toBe(false);
        expect(validationResult[3].valid).toBe(false);
        expect(validationResult[4].valid).toBe(false);
        expect(validationResult[5].valid).toBe(false);
    });

    it ('should return an array of validation, all fields valid', () => {
        nameInputElt.value = 'Name';
        secondNameInputElt.value = 'SecondName';
        emailInputElt.value = 'name@domain.com';
        experienceElt.value = '15';
        childElt.value = '3';
        maleOption.selected = true;

        const validationResult = FormValidator.validateForm(formElt);

        expect(validationResult[0].valid).toBe(true);
        expect(validationResult[1].valid).toBe(true);
        expect(validationResult[2].valid).toBe(true);
        expect(validationResult[3].valid).toBe(true);
        expect(validationResult[4].valid).toBe(true);
        expect(validationResult[5].valid).toBe(true);
    });
});