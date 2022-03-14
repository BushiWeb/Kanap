/**
 * Utility class allowing for form validation.
 * Allows to test:
 *  Entire forms or arrays of form fields
 *  Input elements
 *  Select elements
 *  Number input elements
 *  Check requirement
 *  Check boundaries
 */
export class FormValidator {
    /**
     * Validates a entire form or an array of inputs.
     * @param {HTMLElement | Array[HTMLElement]} formFields - HTML Form element or Array of form fields element to validate
     * @returns {Array[Object:<formField:HTMLElement,valid:boolean,message:string>]} Return an array of objects containing the element object, a boolean indicating it's validity and an optionnal message to display.
     */
    static validateForm(formFields) {
        let formFieldsCollection = formFields;
        let resultArray = [];

        if (!Array.isArray(formFieldsCollection)) {
            formFieldsCollection = formFieldsCollection.elements;
        }

        for (let i = 0 ; i < formFieldsCollection.length ; i++) {
            let validationResult = this.validateFormField(formFieldsCollection[i]);
            let validationObject = {
                formField: formFieldsCollection[i],
                valid: (typeof validationResult === 'boolean' && validationResult),
                message: (typeof validationResult === 'string')? validationResult : ''
            }
            resultArray.push(validationObject);
        }

        return resultArray;
    }


    /**
     * Validates a form field. Checks the type of input and call the appropriate method to validate it.
     * @param {HTMLElement} formField - Form field to validate
     * @param {Object} options - Object containing validations options like requirement, boundaries, text lengths... Applies event if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @returns {boolean | string} True if the field is valid, a string containing the problem otherwise.
     */
    static validateFormField(formField, options = null) {
        if (formField.tagName === 'SELECT') {
            return this.validateSelect(formField, options);
        }

        if (formField.tagName === 'INPUT') {
            return this.validateInput(formField, options);
        }

        return true;
    }


    /**
     * Validates an input element.
     * The function doesn't check that the element is an input element.
     * Validation checks (in order):
     *  Required
     *  Validates input type
     * @param {HTMLInputElement} formField - Input field to validate
     * @param {Object} Options - Object containing validations options like requirement, boundaries, text lengths... Applies event if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @returns {boolean | string} True if field is valid, a string containing the problem otherwise
     */
    static validateInput(formField, options = {
        required: null,
        min: null,
        max: null
    }) {
        if ((options && options.required) ||formField.required) {
            const requiredValidationResult = this.validateRequired(formField);
            if (typeof requiredValidationResult === 'string') {
                return requiredValidationResult;
            }
        }

        if (formField.type === 'number') {
            const numberValidationResult = this.validateNumber(formField, options)
            if (typeof numberValidationResult === 'string') {
                return numberValidationResult;
            }
        }

        return true;
    }


    /**
     * Validates a select element.
     * The function doesn't check that the element is a select element.
     * Validation checks (in order):
     *  Required
     * @param {HTMLSelectElement} formField - Select field to validate
     * @param {Object:<required:boolean>} Options - Object containing validations options like requirement. Applies event if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @returns {boolean | string} True if field is valid, a string containing the problem otherwise
     */
    static validateSelect(formField, options = {
        required: false
    }) {
        if ((options && options.required) || formField.required) {
            const requiredValidation = this.validateRequired(formField);
            if (typeof requiredValidation === 'string') {
                return 'Merci de sélectionner une valeur';
            }
        }

        return true;
    }


    /**
     * Validates a number input element.
     * The function doesn't check that the element is a number input element.
     * Validation checks (in order):
     *  Min and max
     * @param {HTMLInputElement} formField - Select field to validate
     * @param {Object:<min:number, max:number>} options - Object containing validations options like requirement, min and max. Applies event if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @returns {boolean | string} True if field is valid, a string containing the problem otherwise
     */
    static validateNumber(formField, options = {
        min: null,
        max: null
    }) {
        let minBound = null, maxBound = null;

        if (!formField.value) {
            return true;
        }

        if (options && typeof options.min === 'number' && options.min !== NaN) {
            minBound = options.min;
        } else if (formField.min) {
            minBound = parseFloat(formField.min);
        }
        if (options && typeof options.max === 'number' && options.max !== NaN) {
            maxBound = options.max;
        } else if (formField.max) {
            maxBound = parseFloat(formField.max);
        }

        if (minBound !== null || maxBound !== null) {
            const boundariesValidationResult = this.validateBoundaries(formField, minBound, maxBound);
            if (typeof boundariesValidationResult === 'string') {
                return boundariesValidationResult;
            }
        }

        return true;
    }


    /**
     * Checks that a field possesses a value different than:
     *  null
     *  undefined
     *  empty string.
     * Doesn't check for the required attribute.
     * @param {HTMLElement} formField - Field to validate against requirement
     * @returns {boolean | string} True if field is valid against requirement, a string containing the problem otherwise
     */
    static validateRequired(formField) {
        return (formField.value)? true : 'Ce champ doit être complété.';
    }


    /**
     * Validates that the value of an input number is between the boundaries.
     * The function doesn't check that the element is a number input, nor that it possesses the min / max attributes.
     * @param {HTMLInputElement} formField - Number input field to validate
     * @param {number} min - Indicates the lower boundary of the value. Defaults to null.
     * @param {number} max - Indicates the upper boundary of the value. Defaults to null.
     * @returns {boolean | string} True if field is valid, a string containing the problem otherwise
     */
    static validateBoundaries(formField, min = null, max = null) {
        const parsedValue = parseFloat(formField.value);

        return ((min !== null && parsedValue < min) || (max !== null && parsedValue > max))? `La valeur doit être comprise entre ${min} et ${max}.` : true;
    }
}