/**
 * Class managing communication with the localStorage
 */
export class LocalStorageDao {
    /**
     * Fetch data from the localStorage
     * @param {string} propertyName - Name of the property to query.
     * @param {boolean} parse - Indicates if the data should be parsed before returned.
     * @return Return the content of the localStorage property. If parse is true, return the parsed data. If no data is returned, return undefined.
     */
    getData(propertyName, parse = false) {
        const propertyValue = localStorage.getItem(propertyName);

        if (propertyValue === null) {
            return undefined;
        }

        if (parse) {
            return JSON.parse(propertyValue);
        }

        return propertyValue;
    }


    /**
     * Save data to the localStorage. If the data is not a string, serializes the data first.
     * @param {string} propertyName - Name of the property to set.
     * @param {*} data - Data to save to the localStorage.
     */
    setData(propertyName, data) {
        if (data instanceof Object) {
            data = JSON.stringify(data);
        } else if (! (typeof data === 'string')) {
            data = String(data);
        }

        localStorage.setItem(propertyName, data);
    }
}