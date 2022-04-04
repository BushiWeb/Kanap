/**
 * @jest-environment jsdom
 */

import { FormValidator } from './FormValidator';

describe('FormValidator Unit Test Suite', () => {
    describe('validateRequired() Test Suite', () => {
        const requiredInput = document.createElement('input');
        requiredInput.type = 'text';

        it('should return true if the required field possesses a value', () => {
            requiredInput.value = 'test';
            const validationResult = FormValidator.validateRequired(requiredInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return an error message if the required field has no value', () => {
            requiredInput.value = '';
            const validationResult = FormValidator.validateRequired(requiredInput);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateMin() Method Test Suite', () => {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        const inputValue = 4;
        numberInput.value = inputValue;

        it('should return true if the value is above the lower boundary', () => {
            const minValidationResult = FormValidator.validateMin(numberInput, inputValue - 1);
            expect(minValidationResult).toBe(true);
        });

        it('should return true if the value is equal to the lower boundary', () => {
            const minValidationResult = FormValidator.validateMin(numberInput, inputValue);
            expect(minValidationResult).toBe(true);
        });

        it('should return an error message if the value is bellow the lower boundary', () => {
            const minValidationResult = FormValidator.validateMin(numberInput, inputValue + 1);
            expect(typeof minValidationResult).toBe('string');
        });
    });

    describe('validateMax() Method Test Suite', () => {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        const inputValue = 4;
        numberInput.value = inputValue;

        it('should return true if the value is bellow the upper boundary', () => {
            const maxValidationResult = FormValidator.validateMax(numberInput, inputValue + 1);
            expect(maxValidationResult).toBe(true);
        });

        it('should return true if the value is equal to the upper boundary', () => {
            const maxValidationResult = FormValidator.validateMax(numberInput, inputValue);
            expect(maxValidationResult).toBe(true);
        });

        it('should return an error message if the value is above the upper boundary', () => {
            const maxValidationResult = FormValidator.validateMax(numberInput, inputValue - 1);
            expect(typeof maxValidationResult).toBe('string');
        });
    });

    describe('validateBoundaries() Method Test Suite', () => {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        const inputValue = 4;
        numberInput.value = inputValue;

        const validateMinMock = jest.spyOn(FormValidator, 'validateMin');
        const validateMaxMock = jest.spyOn(FormValidator, 'validateMax');

        beforeEach(() => {
            validateMinMock.mockReset();
            validateMaxMock.mockReset();
        });

        it("should'nt call the min and max validation methods if there are no boundaries", () => {
            FormValidator.validateBoundaries(numberInput, null, null);
            expect(validateMaxMock).not.toHaveBeenCalled();
            expect(validateMinMock).not.toHaveBeenCalled();
        });

        it('should return true if there are no boundaries', () => {
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, null, null);
            expect(boundariesValidarionResult).toBe(true);
        });

        it('should call the validateMin() method if there is a lower boundary', () => {
            validateMinMock.mockReturnValue(true);
            FormValidator.validateBoundaries(numberInput, inputValue - 1, null);
            expect(validateMinMock).toHaveBeenCalled();
        });

        it('should call the validateMax() method if there is an upper boundary', () => {
            validateMaxMock.mockReturnValue(true);
            FormValidator.validateBoundaries(numberInput, null, inputValue - 1);
            expect(validateMaxMock).toHaveBeenCalled();
        });

        it('should return true if the min validation returns true', () => {
            validateMinMock.mockReturnValue(true);
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, inputValue - 1, null);
            expect(boundariesValidarionResult).toBe(true);
        });

        it('should return true if the max validation returns true', () => {
            validateMaxMock.mockReturnValue(true);
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, null, inputValue + 1);
            expect(boundariesValidarionResult).toBe(true);
        });

        it('should return true if both the min and max validations return true', () => {
            validateMinMock.mockReturnValue(true);
            validateMaxMock.mockReturnValue(true);
            const boundariesValidarionResult = FormValidator.validateBoundaries(
                numberInput,
                inputValue - 1,
                inputValue + 1
            );
            expect(boundariesValidarionResult).toBe(true);
        });

        it('should return an error message if the min validation fails', () => {
            validateMinMock.mockReturnValue('error');
            validateMaxMock.mockReturnValue(true);
            const boundariesValidarionResult = FormValidator.validateBoundaries(
                numberInput,
                inputValue + 1,
                inputValue + 1
            );
            expect(typeof boundariesValidarionResult).toBe('string');
        });

        it('should return an error message if the max validation fails', () => {
            validateMinMock.mockReturnValue(true);
            validateMaxMock.mockReturnValue('error');
            const boundariesValidarionResult = FormValidator.validateBoundaries(
                numberInput,
                inputValue - 1,
                inputValue - 1
            );
            expect(typeof boundariesValidarionResult).toBe('string');
        });
    });

    describe('validateName() Method Test Suite', () => {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';

        it('should return true if the field is valid', () => {
            nameInput.value = 'Jean';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the field contains trailing dashes', () => {
            nameInput.value = 'Jean--Pierre';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field contains trailing spaces', () => {
            nameInput.value = 'Jean  Pierre';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field starts with a dash', () => {
            nameInput.value = '-Jean-Pierre';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field ends with a dash', () => {
            nameInput.value = 'Jean-Pierre-';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field contains a number', () => {
            nameInput.value = 'Jean1-Pierre';
            const validationResult = FormValidator.validateName(nameInput);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateCity() Method Test Suite', () => {
        const cityInput = document.createElement('input');
        cityInput.type = 'text';

        it('should return true if the field is valid', () => {
            cityInput.value = 'Aix-les-Bains';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the field contains trailing dashes', () => {
            cityInput.value = 'Saint--Pierre';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field contains trailing spaces', () => {
            cityInput.value = 'Les  Adrets';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field starts with a dash', () => {
            cityInput.value = '-Grenoble';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field ends with a dash', () => {
            cityInput.value = 'Corenc-';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the field contains a number', () => {
            cityInput.value = '4nnecy';
            const validationResult = FormValidator.validateCity(cityInput);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateSelect() Test Suite', () => {
        const selectElt = document.createElement('select');
        const optionNull = document.createElement('option');
        optionNull.value = '';
        const optionValid = document.createElement('option');
        optionValid.value = 'valid';
        selectElt.appendChild(optionNull);
        selectElt.appendChild(optionValid);

        const validateRequiredMock = jest.spyOn(FormValidator, 'validateRequired');

        beforeEach(() => {
            validateRequiredMock.mockReset();
            selectElt.required = false;
        });

        it('should call the validateRequired method if the field is required', () => {
            selectElt.required = true;
            FormValidator.validateSelect(selectElt);
            expect(validateRequiredMock).toHaveBeenCalled();
        });

        it('should call the validateRequired() method if the options requires it', () => {
            FormValidator.validateSelect(selectElt, { required: true });
            expect(validateRequiredMock).toHaveBeenCalled();
        });

        it('should return true if the field is not required', () => {
            const validationResult = FormValidator.validateSelect(selectElt, null);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the validateRequired() method returns true', () => {
            validateRequiredMock.mockReturnValue(true);
            const validationResult = FormValidator.validateSelect(selectElt, { required: true });
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the validateRequired() fails', () => {
            validateRequiredMock.mockReturnValue('test');
            const validationResult = FormValidator.validateSelect(selectElt, { required: true });
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateNumber() Method Test Suite', () => {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        const inputValue = 4;

        const validateBoundariesMock = jest.spyOn(FormValidator, 'validateBoundaries');

        beforeEach(() => {
            numberInput.value = inputValue;
            validateBoundariesMock.mockReset();
            numberInput.min = '';
            numberInput.max = '';
        });

        it('should call the validateBoundaries() method with the right parameters if there is a lower boundary on the element', () => {
            numberInput.min = inputValue;
            FormValidator.validateNumber(numberInput, { min: null, max: null });
            expect(validateBoundariesMock).toHaveBeenCalled();
            expect(validateBoundariesMock).toHaveBeenCalledWith(numberInput, inputValue, null);
        });

        it('should call the validateBoundaries() method with the right parameters if there is an upper boundary on the element', () => {
            numberInput.max = inputValue;
            FormValidator.validateNumber(numberInput, { min: null, max: null });
            expect(validateBoundariesMock).toHaveBeenCalled();
            expect(validateBoundariesMock).toHaveBeenCalledWith(numberInput, null, inputValue);
        });

        it('should call the validateBoundaries() method with the right parameters if there is a lower boundary in the options', () => {
            FormValidator.validateNumber(numberInput, { min: inputValue, max: null });
            expect(validateBoundariesMock).toHaveBeenCalled();
            expect(validateBoundariesMock).toHaveBeenCalledWith(numberInput, inputValue, null);
        });

        it('should call the validateBoundaries() method with the right parameters if there is an upper boundary in the options', () => {
            FormValidator.validateNumber(numberInput, { min: null, max: inputValue });
            expect(validateBoundariesMock).toHaveBeenCalled();
            expect(validateBoundariesMock).toHaveBeenCalledWith(numberInput, null, inputValue);
        });

        it('should return true if no options are specified', () => {
            const validationResult = FormValidator.validateNumber(numberInput, null);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if there is no value', () => {
            numberInput.value = '';
            const validationResult = FormValidator.validateNumber(numberInput, null);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the value is not a number', () => {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = 'a';
            const validationResult = FormValidator.validateNumber(textInput, null);
            expect(typeof validationResult).toBe('string');
        });

        it('should return true if the validateBoundaries() method returns true', () => {
            validateBoundariesMock.mockReturnValue(true);
            const validationResult = FormValidator.validateNumber(numberInput, { min: inputValue - 1 });
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the validateBoundaries() method returns a string', () => {
            validateBoundariesMock.mockReturnValue('test');
            const validationResult = FormValidator.validateNumber(numberInput, { min: inputValue + 1 });
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateText() Method Test Suite', () => {
        const textInput = document.createElement('input');
        textInput.type = 'text';

        const mockValidateName = jest.spyOn(FormValidator, 'validateName');
        const mockValidateCity = jest.spyOn(FormValidator, 'validateCity');

        beforeEach(() => {
            mockValidateCity.mockReset();
            mockValidateName.mockReset();
        });

        it('should call the validateName() method if the element is named lastName', () => {
            textInput.name = 'lastName';
            textInput.value = 'test';
            FormValidator.validateText(textInput);
            expect(mockValidateName).toHaveBeenCalled();
        });

        it('should call the validateName() method if the element is named firstName', () => {
            textInput.name = 'firstName';
            textInput.value = 'test';
            FormValidator.validateText(textInput);
            expect(mockValidateName).toHaveBeenCalled();
        });

        it('should call the validateName() method if there is a name in the options', () => {
            textInput.name = 'other';
            textInput.value = 'test';
            FormValidator.validateText(textInput, { name: true });
            expect(mockValidateName).toHaveBeenCalled();
        });

        it('should call the validateCity() method if the element is named city', () => {
            textInput.name = 'city';
            textInput.value = 'test';
            FormValidator.validateText(textInput);
            expect(mockValidateCity).toHaveBeenCalled();
        });

        it('should call the validateCity() method if there is a city in the options', () => {
            textInput.name = 'other';
            textInput.value = 'test';
            FormValidator.validateText(textInput, { city: true });
            expect(mockValidateCity).toHaveBeenCalled();
        });

        it('should return true if there is no value', () => {
            textInput.value = '';
            const validationResult = FormValidator.validateText(textInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the value is a valid name', () => {
            textInput.name = 'firstName';
            textInput.value = 'Kate';
            mockValidateName.mockReturnValueOnce(true);
            const validationResult = FormValidator.validateText(textInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if value is a valid city', () => {
            textInput.name = 'city';
            textInput.value = 'Jarrie';
            mockValidateCity.mockReturnValueOnce(true);
            const validationResult = FormValidator.validateText(textInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the value is an invalid name', () => {
            textInput.name = 'firstName';
            textInput.value = '--Kate';
            mockValidateName.mockReturnValueOnce('test');
            const validationResult = FormValidator.validateText(textInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the value is an invalid city', () => {
            textInput.name = 'city';
            textInput.value = 'Lyon3';
            mockValidateCity.mockReturnValueOnce('test');
            const validationResult = FormValidator.validateText(textInput);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateEmail() Method Test Suite', () => {
        const textInput = document.createElement('input');
        textInput.type = 'email';

        it('should return true if there is no value', () => {
            textInput.value = '';
            const validationResult = FormValidator.validateEmail(textInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the value is a valid email', () => {
            textInput.value = 'michael.jackson+woohoo@music.com';
            const validationResult = FormValidator.validateEmail(textInput);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the value is an invalid email, without @', () => {
            textInput.value = 'michael.jackson+woohoomusic.com';
            const validationResult = FormValidator.validateEmail(textInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the value is an invalid email, without domain', () => {
            textInput.value = 'michael.jackson+woohoo@';
            const validationResult = FormValidator.validateEmail(textInput);
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the value is an invalid email, without username', () => {
            textInput.value = '@music.com';
            const validationResult = FormValidator.validateEmail(textInput);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateInput() Method Test Suite', () => {
        const inputElt = document.createElement('input');

        const validateRequiredMock = jest.spyOn(FormValidator, 'validateRequired');
        const validateNumberMock = jest.spyOn(FormValidator, 'validateNumber');
        const validateTextMock = jest.spyOn(FormValidator, 'validateText');
        const validateEmailMock = jest.spyOn(FormValidator, 'validateEmail');

        beforeEach(() => {
            validateRequiredMock.mockReset();
            validateNumberMock.mockReset();
            validateTextMock.mockReset();
            validateEmailMock.mockReset();
            inputElt.required = false;
            inputElt.type = '';
        });

        it('should call the validateRequired() method if the field is required', () => {
            inputElt.required = true;
            FormValidator.validateInput(inputElt, null);
            expect(validateRequiredMock).toHaveBeenCalled();
        });

        it('should call the validateRequired() method if the options require it', () => {
            FormValidator.validateInput(inputElt, { required: true });
            expect(validateRequiredMock).toHaveBeenCalled();
        });

        it('should call the validateNumber() method if the input is of type number', () => {
            inputElt.type = 'number';
            FormValidator.validateInput(inputElt);
            expect(validateNumberMock).toHaveBeenCalled();
        });

        it('should call the validateText() method if the input is of type text', () => {
            inputElt.type = 'text';
            FormValidator.validateInput(inputElt);
            expect(validateTextMock).toHaveBeenCalled();
        });

        it('should call the validateEmail() method if the input is of type email', () => {
            inputElt.type = 'email';
            FormValidator.validateInput(inputElt);
            expect(validateEmailMock).toHaveBeenCalled();
        });

        it('should call the validateNumber() method with boundaries options if the input is of type number and the options contain boundaries', () => {
            inputElt.type = 'number';
            const optionsTest = {
                min: 7,
                max: null,
            };
            FormValidator.validateInput(inputElt, optionsTest);
            expect(validateNumberMock).toHaveBeenCalled();
            expect(validateNumberMock).toHaveBeenCalledWith(inputElt, optionsTest);
        });

        it('should return true if the field is not required and is not a number', () => {
            const validationResult = FormValidator.validateInput(inputElt);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the validateRequired() method returns true', () => {
            validateRequiredMock.mockReturnValue(true);
            const validationResult = FormValidator.validateInput(inputElt, { required: true });
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the validateNumber() method returns true', () => {
            validateNumberMock.mockReturnValue(true);
            inputElt.type = 'number';
            const validationResult = FormValidator.validateInput(inputElt, {});
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the validateText() method returns true', () => {
            validateTextMock.mockReturnValue(true);
            inputElt.type = 'text';
            const validationResult = FormValidator.validateInput(inputElt, {});
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return true if the validateEmail() method returns true', () => {
            validateEmailMock.mockReturnValue(true);
            inputElt.type = 'email';
            const validationResult = FormValidator.validateInput(inputElt, {});
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the validateRequired() method returns a string', () => {
            validateRequiredMock.mockReturnValue('test');
            validateNumberMock.mockReturnValue(true);
            inputElt.type = 'number';
            const validationResult = FormValidator.validateInput(inputElt, { required: true });
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the validateNumber() method returns a string', () => {
            validateRequiredMock.mockReturnValue(true);
            validateNumberMock.mockReturnValue('test');
            inputElt.type = 'number';
            const validationResult = FormValidator.validateInput(inputElt, { required: true });
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the validateText() method returns a string', () => {
            validateRequiredMock.mockReturnValue(true);
            validateTextMock.mockReturnValue('test');
            inputElt.type = 'text';
            const validationResult = FormValidator.validateInput(inputElt, { required: true });
            expect(typeof validationResult).toBe('string');
        });

        it('should return a string if the validateEmail() method returns a string', () => {
            validateRequiredMock.mockReturnValue(true);
            validateEmailMock.mockReturnValue('test');
            inputElt.type = 'email';
            const validationResult = FormValidator.validateInput(inputElt, { required: true });
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateFormField() Method Test Suite', () => {
        const validateInputMock = jest.spyOn(FormValidator, 'validateInput');
        const validateSelectMock = jest.spyOn(FormValidator, 'validateSelect');

        const selectElt = document.createElement('select');
        const optionNull = document.createElement('option');
        optionNull.value = '';
        const optionValid = document.createElement('option');
        optionValid.value = 'valid';
        selectElt.appendChild(optionNull);
        selectElt.appendChild(optionValid);
        const selectOptions = {
            required: true,
        };

        const inputElt = document.createElement('input');
        const inputOptions = {
            required: true,
            min: 10,
            max: 15,
        };

        beforeEach(() => {
            validateInputMock.mockReset();
            validateSelectMock.mockReset();
        });

        it('should call the validateSelect() method with the right parameters if the input is a select element', () => {
            FormValidator.validateFormField(selectElt, selectOptions);
            expect(validateSelectMock).toHaveBeenCalled();
            expect(validateSelectMock).toHaveBeenCalledWith(selectElt, selectOptions);
        });

        it('should return true if the input is a valid select element', () => {
            validateSelectMock.mockReturnValue(true);
            const validationResult = FormValidator.validateFormField(selectElt);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the input is a invalid select element', () => {
            validateSelectMock.mockReturnValue('test');
            const validationResult = FormValidator.validateFormField(selectElt, selectOptions);
            expect(typeof validationResult).toBe('string');
        });

        it('should call the validateInput() method with the right parameters if the input is an input element', () => {
            FormValidator.validateFormField(inputElt, inputOptions);
            expect(validateInputMock).toHaveBeenCalled();
            expect(validateInputMock).toHaveBeenCalledWith(inputElt, inputOptions);
        });

        it('should return true if the input is a valid input element', () => {
            validateInputMock.mockReturnValue(true);
            const validationResult = FormValidator.validateFormField(inputElt);
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the input is an invalid input element', () => {
            validateInputMock.mockReturnValue('test');
            const validationResult = FormValidator.validateFormField(inputElt, inputOptions);
            expect(typeof validationResult).toBe('string');
        });
    });

    describe('validateForm() Method Test Suite', () => {
        const firstFieldValid = document.createElement('input');
        firstFieldValid.name = 'first';
        const secondFieldInvalid = document.createElement('input');
        secondFieldInvalid.name = 'second';
        const thirdFieldValid = document.createElement('input');
        thirdFieldValid.name = 'third';
        const fourthFieldInvalid = document.createElement('input');
        fourthFieldInvalid.name = 'fourth';

        const validateFormFieldMock = jest.spyOn(FormValidator, 'validateFormField');

        beforeEach(() => {
            validateFormFieldMock.mockReset();
            validateFormFieldMock
                .mockReturnValueOnce(true)
                .mockReturnValueOnce('false')
                .mockReturnValueOnce(true)
                .mockReturnValueOnce('false');
        });

        it('should return an array of four object, with the second and fourth field being invalid, if the input is a form with four fields, the second and the fourth being invalid', () => {
            const testFormElement = document.createElement('form');
            testFormElement.appendChild(firstFieldValid);
            testFormElement.appendChild(secondFieldInvalid);
            testFormElement.appendChild(thirdFieldValid);
            testFormElement.appendChild(fourthFieldInvalid);

            const validationResult = FormValidator.validateForm(testFormElement);

            expect(validationResult.valid).toBeFalsy();
            expect(validationResult.fields.first).toBe('');
            expect(validationResult.fields.second).toBe('false');
            expect(validationResult.fields.third).toBe('');
            expect(validationResult.fields.fourth).toBe('false');
        });

        it('should return an array of four object, with the second and fourth field being invalid, if the input is a form with four fields inside of multiple fieldsets, the second and the fourth being invalid', () => {
            const testFormElement = document.createElement('form');
            const formField1 = document.createElement('formField');
            const formField2 = document.createElement('formField');
            formField1.appendChild(firstFieldValid);
            formField1.appendChild(secondFieldInvalid);
            formField2.appendChild(thirdFieldValid);
            testFormElement.appendChild(formField1);
            testFormElement.appendChild(formField2);
            testFormElement.appendChild(fourthFieldInvalid);

            const validationResult = FormValidator.validateForm(testFormElement);

            expect(validationResult.fields.first).toBe('');
            expect(validationResult.fields.second).toBe('false');
            expect(validationResult.fields.third).toBe('');
            expect(validationResult.fields.fourth).toBe('false');
        });

        it('should return an array of four object, with the second and fourth field being invalid, if the input is an array with four form field elements, the second and the fourth being invalid', () => {
            const testArrayElement = [firstFieldValid, secondFieldInvalid, thirdFieldValid, fourthFieldInvalid];

            const validationResult = FormValidator.validateForm(testArrayElement);

            expect(validationResult.fields.first).toBe('');
            expect(validationResult.fields.second).toBe('false');
            expect(validationResult.fields.third).toBe('');
            expect(validationResult.fields.fourth).toBe('false');
        });
    });
});
