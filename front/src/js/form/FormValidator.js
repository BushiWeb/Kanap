/**
 * Class containing methods to validate forms.
 */
export class FormValidator {
    /**
     * Validate an entire form or a list of inputs.
     * @param {HTMLElement | HTMLElement[]} formFields - The HTML Form element or an array of form inputs elements to validate.
     * @return {{formField:HTMLElement,valid:boolean,message:string}[]} Return an array of objects containing the element object, a boolean indicating its validity and an optionnal message to display.
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
     * Validate a form field.
     * Check the type of input and call the appropriate method to validate it.
     * @param {HTMLElement} formField - Form field to validate.
     * @param {Object} options - An object containing validations options like requirement, boundaries, text lengths... Applies even if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
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
     * Validate an input element.
     * The function doesn't check that the element is an input element.
     * Verifications done (in order):
     *  Required;
     *  Validates input type.
     * @param {HTMLInputElement} formField - The input field to validate.
     * @param {Object} Options - An object containing validations options like requirement, boundaries, text lengths... Applies even if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
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
     * Validate a select element.
     * The function doesn't check that the element is a select element.
     * Verifications done (in order):
     *  Required.
     * @param {HTMLSelectElement} formField - The select field to validate.
     * @param {{required:boolean}} Options - An object containing validations options like requirement. Applies even if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
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
     * Validate a number input element.
     * The function doesn't check that the element is a number input element.
     * Verifications done (in order):
     *  Min and max.
     * @param {HTMLInputElement} formField - The input field to validate.
     * @param {{min:number, max:number}} options - An object containing validations options like min and max. Applies even if the element doesn't have the corresponding attributes. Override the value of the attributes.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
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
     * Check that a field possesses a value different than:
     *  null
     *  undefined
     *  empty string.
     * Doesn't check for the required attribute.
     * @param {HTMLElement} formField - The field to validate against requirement.
     * @return {boolean | string} Return true if the field is valid against requirement, a string containing the problem otherwise.
     */
    static validateRequired(formField) {
        return (formField.value)? true : 'Ce champ doit être complété.';
    }


    /**
     * Validate that the value of an input number is inside of the boundaries.
     * The function doesn't check that the element is a number input, nor that it possesses the min / max attributes.
     * @param {HTMLInputElement} formField - The number input field to validate.
     * @param {number} min - The lower boundary of the value. Defaults to null.
     * @param {number} max - The upper boundary of the value. Defaults to null.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
     */
    static validateBoundaries(formField, min = null, max = null) {
        let minValidation = (min !== null)? this.validateMin(formField, min) : true;
        let maxValidation = (max !== null)? this.validateMax(formField, max) : true;
        let errorMessage = ''

        if (typeof minValidation === 'string') {
            errorMessage = minValidation;
        }

        if (typeof maxValidation === 'string') {
            errorMessage = (errorMessage)? `La valeur doit être comprise entre ${min} et ${max}` : maxValidation;
        }

        return (errorMessage)? errorMessage : true;
    }



    /**
     * Validate that the value of an input if above a lower boundary.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @param {number} min - The lower boundary value.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateMin(formField, min) {
        const parsedValue = parseFloat(formField.value);

        return (parsedValue >= min)? true : `La valeur doit être supérieure à ${min}`;
    }



    /**
     * Validate that the value of an input if bellow an upper boundary.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @param {number} max - The upper boundary value.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateMax(formField, max) {
        const parsedValue = parseFloat(formField.value);

        return (parsedValue <= max)? true : `La valeur doit être supérieure à ${max}`;
    }
}