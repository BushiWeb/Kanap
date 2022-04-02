/**
 * Class representing a contact
 */
export class Contact {
    /**
     * Construct the contact.
     * @param {string} firstName - Contact's first name.
     * @param {string} lastName - Contact's last name.
     * @param {string} adress - Contact's address.
     * @param {string} city - Contact's city.
     * @param {string} email - Contact's email.
     */
     constructor(firstName, lastName, adress, city, email) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._address = adress;
        this._city = city;
        this._email = email;
    }

    /********************************************
     * GETTERS
     ********************************************/
    /**
     * _firstName property getter.
     * @return {string} Return the value of the _firstName property.
     */
     get firstName() {
        return this._firstName;
    }

    /**
     * _lastName property getter.
     * @return {string} Return the value of the _lastName property.
     */
    get lastName() {
        return this._lastName;
    }

    /**
     * _address property getter.
     * @return {string} Return the value of the _address property.
     */
    get address() {
        return this._address;
    }

    /**
     * _city property getter.
     * @return {string} Return the value of the _city property.
     */
    get city() {
        return this._city;
    }

    /**
     * _email property getter.
     * @return {string} Return the value of the _email property.
     */
    get email() {
        return this._email;
    }
}