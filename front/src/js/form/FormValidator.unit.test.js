/**
 * @jest-environment jsdom
 */

import { FormValidator } from "./FormValidator";

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

        it('should\'nt call the min and max validation methods if there are no boundaries', () => {
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
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, inputValue - 1, inputValue + 1);
            expect(boundariesValidarionResult).toBe(true);
        });

        it('should return an error message if the min validation fails', () => {
            validateMinMock.mockReturnValue('error');
            validateMaxMock.mockReturnValue(true);
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, inputValue + 1, inputValue + 1);
            expect(typeof boundariesValidarionResult).toBe('string');
        });

        it('should return an error message if the max validation fails', () => {
            validateMinMock.mockReturnValue(true);
            validateMaxMock.mockReturnValue('error');
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, inputValue - 1, inputValue - 1);
            expect(typeof boundariesValidarionResult).toBe('string');
        });

        it('should return an error message if both the min and the max validations fail', () => {
            validateMinMock.mockReturnValue('error');
            validateMaxMock.mockReturnValue('error');
            const boundariesValidarionResult = FormValidator.validateBoundaries(numberInput, inputValue - 1, inputValue - 1);
            expect(typeof boundariesValidarionResult).toBe('string');
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
            validateRequiredMock.mockReturnValue(true)
            const validationResult = FormValidator.validateSelect(selectElt, { required: true });
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the validateRequired() fails', () => {
            validateRequiredMock.mockReturnValue('test')
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

        it('should return true if the validateBoundaries() method returns true', () => {
            validateBoundariesMock.mockReturnValue(true)
            const validationResult = FormValidator.validateNumber(numberInput, { min: inputValue - 1 });
            expect(typeof validationResult).toBe('boolean');
            expect(validationResult).toBe(true);
        });

        it('should return a string if the validateBoundaries() method returns a string', () => {
            validateBoundariesMock.mockReturnValue('test')
            const validationResult = FormValidator.validateNumber(numberInput, { min: inputValue + 1 });
            expect(typeof validationResult).toBe('string');
        });
    });


    describe('validateInput() Method Test Suite', () => {
        const inputElt = document.createElement('input');

        const validateRequiredMock = jest.spyOn(FormValidator, 'validateRequired');
        const validateNumberMock = jest.spyOn(FormValidator, 'validateNumber');

        beforeEach(() => {
            validateRequiredMock.mockReset();
            validateNumberMock.mockReset();
            inputElt.required = false;
            inputElt.type = 'text';
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

        it('should call the validateNumber() method with boundaries options if the input is of type number and the options contain boundaries', () => {
            inputElt.type = 'number';
            const optionsTest = {
                min: 7,
                max: null
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
            validateRequiredMock.mockReturnValue(true);
            inputElt.type = 'number';
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
            required: true
        }

        const inputElt = document.createElement('input');
        const inputOptions = {
            required: true,
            min: 10,
            max: 15
        }


        beforeEach(() => {
            validateInputMock.mockReset();
            validateSelectMock.mockReset();
       });

        it('should call the validateSelect() method with the right parameters if the input is a select element', () => {
            FormValidator.validateFormField(selectElt, selectOptions)
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
            FormValidator.validateFormField(inputElt, inputOptions)
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
        const secondFieldInvalid = document.createElement('input');
        const thirdFieldValid = document.createElement('input');
        const fourthFieldInvalid = document.createElement('input');

        const validateFormFieldMock = jest.spyOn(FormValidator, 'validateFormField');

        beforeEach(() => {
            validateFormFieldMock.mockReset();
            validateFormFieldMock.mockReturnValueOnce(true).mockReturnValueOnce('false').mockReturnValueOnce(true).mockReturnValueOnce('false');
        });

        it('should return an array of four object, with the second and fourth field being invalid, if the input is a form with four fields, the second and the fourth being invalid', () => {
            const testFormElement = document.createElement('form');
            testFormElement.appendChild(firstFieldValid);
            testFormElement.appendChild(secondFieldInvalid);
            testFormElement.appendChild(thirdFieldValid);
            testFormElement.appendChild(fourthFieldInvalid);

            const validationResult = FormValidator.validateForm(testFormElement);

            expect(validationResult[0].formField).toBe(firstFieldValid);
            expect(validationResult[0].valid).toBe(true);
            expect(validationResult[0].message).toBe('');
            expect(validationResult[1].formField).toBe(secondFieldInvalid);
            expect(validationResult[1].valid).toBe(false);
            expect(validationResult[1].message).toBe('false');
            expect(validationResult[2].formField).toBe(thirdFieldValid);
            expect(validationResult[2].valid).toBe(true);
            expect(validationResult[2].message).toBe('');
            expect(validationResult[3].formField).toBe(fourthFieldInvalid);
            expect(validationResult[3].valid).toBe(false);
            expect(validationResult[3].message).toBe('false');
        })

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

            expect(validationResult[0].formField).toBe(firstFieldValid);
            expect(validationResult[0].valid).toBe(true);
            expect(validationResult[0].message).toBe('');
            expect(validationResult[1].formField).toBe(secondFieldInvalid);
            expect(validationResult[1].valid).toBe(false);
            expect(validationResult[1].message).toBe('false');
            expect(validationResult[2].formField).toBe(thirdFieldValid);
            expect(validationResult[2].valid).toBe(true);
            expect(validationResult[2].message).toBe('');
            expect(validationResult[3].formField).toBe(fourthFieldInvalid);
            expect(validationResult[3].valid).toBe(false);
            expect(validationResult[3].message).toBe('false');
        })

        it('should return an array of four object, with the second and fourth field being invalid, if the input is an array with four form field elements, the second and the fourth being invalid', () => {
            const testArrayElement = [firstFieldValid, secondFieldInvalid, thirdFieldValid, fourthFieldInvalid];

            const validationResult = FormValidator.validateForm(testArrayElement);

            expect(validationResult[0].formField).toBe(firstFieldValid);
            expect(validationResult[0].valid).toBe(true);
            expect(validationResult[0].message).toBe('');
            expect(validationResult[1].formField).toBe(secondFieldInvalid);
            expect(validationResult[1].valid).toBe(false);
            expect(validationResult[1].message).toBe('false');
            expect(validationResult[2].formField).toBe(thirdFieldValid);
            expect(validationResult[2].valid).toBe(true);
            expect(validationResult[2].message).toBe('');
            expect(validationResult[3].formField).toBe(fourthFieldInvalid);
            expect(validationResult[3].valid).toBe(false);
            expect(validationResult[3].message).toBe('false');
        })
    });
});