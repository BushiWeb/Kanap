/**
 * Class containing methods to validate forms.
 */
export class FormValidator {
    /**
     * Validate an entire form or a list of inputs.
     * @param {HTMLElement | HTMLElement[]} formFields - The HTML Form element or an array of form inputs elements to validate.
     * @return {{valid:boolean, fields:Object}} Return an object containing a boolean and another object whose properties are the fields' name and their value the error message (empty if valid).
     */
    static validateForm(formFields) {
        let formFieldsCollection = formFields;
        let resultObject = {};
        let valid = true;

        if (!Array.isArray(formFieldsCollection)) {
            formFieldsCollection = formFieldsCollection.elements;
        }

        for (let i = 0; i < formFieldsCollection.length; i++) {
            let validationResult = this.validateFormField(formFieldsCollection[i]);
            if (typeof validationResult === 'string') {
                resultObject[formFieldsCollection[i].name] = validationResult;
                valid = false;
            } else {
                resultObject[formFieldsCollection[i].name] = '';
            }
        }

        return { valid: valid, fields: resultObject };
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
    static validateInput(formField, options = {}) {
        if ((options && options.required) || formField.required) {
            const requiredValidationResult = this.validateRequired(formField);
            if (typeof requiredValidationResult === 'string') {
                return requiredValidationResult;
            }
        }

        if (formField.type === 'number') {
            const numberValidationResult = this.validateNumber(formField, options);
            if (typeof numberValidationResult === 'string') {
                return numberValidationResult;
            }
        }

        if (formField.type === 'text') {
            const textValidationResult = this.validateText(formField, options);
            if (typeof textValidationResult === 'string') {
                return textValidationResult;
            }
        }

        if (formField.type === 'email') {
            const emailValidationResult = this.validateEmail(formField, options);
            if (typeof emailValidationResult === 'string') {
                return emailValidationResult;
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
    static validateSelect(
        formField,
        options = {
            required: false,
        }
    ) {
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
    static validateNumber(formField, options = {}) {
        let minBound = null,
            maxBound = null;

        if (!formField.value) {
            return true;
        }

        if (Number.isNaN(parseFloat(formField.value))) {
            return 'La valeur doit être un nombre';
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
     * Validate an email input element.
     * The function doesn't check that the element is an email input element.
     * @param {HTMLInputElement} formField - The input field to validate.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
     */
    static validateEmail(formField) {
        if (!formField.value) {
            return true;
        }

        return formField.value.match(
            /^[!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*@[!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)+$/
        ) !== null
            ? true
            : `La valeur doit être un email valide`;
    }

    /**
     * Validate a text input element.
     * The function doesn't check that the element is a text input element.
     * Validate if the content is a name or a city
     * @param {HTMLInputElement} formField - The input field to validate.
     * @param {{name:boolean, city:boolean}} options - An object containing validations options. These options allows for validation depending on the type of content, like name or city. Overrides the name attribute of the element. If both are given, name is chosen.
     * @return {boolean | string} Return true if field is valid, a string containing the problem otherwise.
     */
    static validateText(
        formField,
        options = {
            name: false,
            city: false,
        }
    ) {
        if (!formField.value) {
            return true;
        }

        if (options && options.name) {
            return this.validateName(formField);
        }

        if (options && options.city) {
            return this.validateCity(formField);
        }

        switch (formField.name.toLowerCase()) {
            case 'firstname':
            case 'lastname':
                return this.validateName(formField);
            case 'city':
                return this.validateCity(formField);
            default:
                return 3;
        }
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
        return formField.value ? true : 'Ce champ doit être complété.';
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
        let minValidation = min !== null ? this.validateMin(formField, min) : true;
        let maxValidation = max !== null ? this.validateMax(formField, max) : true;

        if (typeof minValidation === 'string') {
            return minValidation;
        }

        if (typeof maxValidation === 'string') {
            return maxValidation;
        }

        return true;
    }

    /**
     * Validate that the value of an input if above a lower boundary.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @param {number} min - The lower boundary value.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateMin(formField, min) {
        const parsedValue = parseFloat(formField.value);

        return parsedValue >= min ? true : `La valeur doit être supérieure à ${min}`;
    }

    /**
     * Validate that the value of an input if bellow an upper boundary.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @param {number} max - The upper boundary value.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateMax(formField, max) {
        const parsedValue = parseFloat(formField.value);

        return parsedValue <= max ? true : `La valeur doit être supérieure à ${max}`;
    }

    /**
     * Validate that the value of an input is a name.
     * A name must be a string of letters. This string can be splitted using spaces or dashes, but can't contain multiple dashes or spaces following each other, nor can it starts or ends with dashes or spaces.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateName(formField) {
        return formField.value.match(/^(?:[\p{L}]+[ -])*[\p{L}]+$/u) !== null
            ? true
            : `La valeur doit être un prénom valide`;
    }

    /**
     * Validate that the value of an input is a city name.
     * A city name must be a string of letters. This string can be splitted using spaces or dashes, but can't contain multiple dashes or spaces following each other, nor can it starts or ends with dashes or spaces.
     * @param {HTMLInputElement} formField - The field element to validate.
     * @return {boolean | string} Return true if the field is valid, a string containing the problem otherwise.
     */
    static validateCity(formField, max) {
        return formField.value.match(/^(?:[\p{L}]+[ -])*[\p{L}]+$/u) !== null
            ? true
            : `La valeur doit être un nom de ville valide`;
    }
}
