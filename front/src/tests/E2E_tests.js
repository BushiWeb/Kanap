describe('Home Page Testing', () => {
    it('should display the products list in the home page', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .assert.elementPresent('#items a')
            .assert.elementPresent('#items a article')
            .assert.elementPresent('#items a article')
            .assert.elementPresent('#items a article img')
            .assert.elementPresent('#items a article .productName')
            .assert.elementPresent('#items a article .productDescription')
            .end();
    });
});

describe('Product Page Testing', () => {
    it("should display the product's informations", () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .assert.urlContains('product.html?id=')
            .assert.elementPresent('.item__img img')
            .assert.elementPresent('#title')
            .assert.elementPresent('#price')
            .assert.elementPresent('#description')
            .end();
    });
});

describe('Add to cart Testing', () => {
    it('should display errors if inputs are invalid', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .click('#addToCart')
            .assert.elementPresent('#quantity  + p.error')
            .assert.elementPresent('#colors + p.error')
            .end();
    });

    it('should remove errors, display notification and add the product to the cart page if the inputs are valid', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .click('#addToCart')
            .assert.elementPresent('#quantity  + p.error')
            .assert.elementPresent('#colors + p.error')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .assert.not.elementPresent('#quantity + .error')
            .assert.not.elementPresent('#colors + .error')
            .assert.elementPresent('#notification-container')
            .getText('#title', function (result) {
                this.url(__dirname + '\\..\\..\\dist\\html\\cart.html');
                this.expect.elements('.cart__item').count.to.equal(1);
                this.expect.element('.cart__item h2').text.to.equal(result.value);
            })
            .end();
    });
});

describe('Cart Page Testing', () => {
    it("should display the cart's products list", () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:nth-child(2)')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .clearValue('#quantity')
            .sendKeys('#quantity', '2')
            .click('#colors option:nth-child(3)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html');
        browser.expect.elements('.cart__item').count.to.equal(3);
        browser.expect.element('#totalQuantity').text.to.equal('10');
        browser.end();
    });
});

describe('Delete product from cart Testing', () => {
    it('should remove the product visualy and update the total price and quantity', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html');
        browser.expect.elements('.cart__item').count.to.equal(1);
        browser.expect.element('#totalQuantity').text.to.equal('4');
        browser.click('p.deleteItem').assert.not.elementPresent('.cart__item');
        browser.expect.element('#totalQuantity').text.to.equal('0');
        browser.expect.element('#totalPrice').text.to.equal('0');
        browser.end();
    });
});

describe('Change product quantity Testing', () => {
    it('should display an error if the quantity is invalid', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html');
        browser.expect.elements('.cart__item').count.to.equal(1);
        browser.expect.element('#totalQuantity').text.to.equal('4');
        browser
            .clearValue('.itemQuantity')
            .sendKeys('.itemQuantity', '0')
            .assert.elementPresent('.itemQuantity + .error')
            .end();
    });

    it('should remove the error and update the total quantity if the quantity is valid', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html');
        browser.expect.elements('.cart__item').count.to.equal(1);
        browser.expect.element('#totalQuantity').text.to.equal('4');
        browser
            .clearValue('.itemQuantity:first-of-type')
            .sendKeys('.itemQuantity:first-of-type', ['0', browser.Keys.ENTER])
            .assert.elementPresent('.itemQuantity:first-of-type + .error')
            .assert.value('.itemQuantity:first-of-type', '0')
            .clearValue('.itemQuantity:first-of-type')
            .sendKeys('.itemQuantity:first-of-type', ['6', browser.Keys.ENTER])
            .assert.not.elementPresent('.itemQuantity:first-of-type + .error')
            .assert.value('.itemQuantity:first-of-type', '6')
            .end();
    });
});

describe('Send order Testing', () => {
    it('should display a notification if no product is in the cart', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html')
            .sendKeys('#firstName', 'John')
            .sendKeys('#lastName', 'Doe')
            .sendKeys('#address', 'Dupont street')
            .sendKeys('#city', 'Generic-City')
            .sendKeys('#email', 'john.doe@domain.com')
            .click('#order')
            .assert.elementPresent('#notification-container')
            .end();
    });

    it('should display errors underneath invalid form fields', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html')
            .sendKeys('#firstName', 'J000hn')
            .sendKeys('#lastName', 'Do--e')
            .sendKeys('#address', 'Dupont street')
            .sendKeys('#city', '  Generic-City--')
            .sendKeys('#email', 'john.doe@domain')
            .click('#order')
            .assert.textContains('#firstNameErrorMsg', 'valide')
            .assert.textContains('#lastNameErrorMsg', 'valide')
            .assert.not.textContains('#addressErrorMsg', 'valide')
            .assert.textContains('#cityErrorMsg', 'valide')
            .assert.textContains('#emailErrorMsg', 'valide')
            .end();
    });

    it('should hide errors underneath corrected form fields', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html')
            .sendKeys('#firstName', 'J000hn')
            .sendKeys('#lastName', 'Do--e')
            .sendKeys('#address', 'Dupont street')
            .sendKeys('#city', '  Generic-City--')
            .sendKeys('#email', 'john.doe@domain')
            .click('#order')
            .assert.textContains('#firstNameErrorMsg', 'valide')
            .assert.textContains('#lastNameErrorMsg', 'valide')
            .assert.not.textContains('#addressErrorMsg', 'valide')
            .assert.textContains('#cityErrorMsg', 'valide')
            .assert.textContains('#emailErrorMsg', 'valide')
            .clearValue('#firstName')
            .sendKeys('#firstName', 'John')
            .clearValue('#email')
            .sendKeys('#email', 'john.doe@domain.com')
            .click('#order')
            .assert.not.textContains('#firstNameErrorMsg', 'valide')
            .assert.textContains('#lastNameErrorMsg', 'valide')
            .assert.not.textContains('#addressErrorMsg', 'valide')
            .assert.textContains('#cityErrorMsg', 'valide')
            .assert.not.textContains('#emailErrorMsg', 'valide')
            .end();
    });

    it('should send the order, redirect to the confirmation page, display the order id and empty the cart', () => {
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\index.html')
            .click('#items a:first-child')
            .clearValue('#quantity')
            .sendKeys('#quantity', '4')
            .click('#colors option:nth-child(2)')
            .click('#addToCart')
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html')
            .sendKeys('#firstName', 'John')
            .sendKeys('#lastName', 'Doe')
            .sendKeys('#address', 'Dupont street')
            .sendKeys('#city', 'Generic-City')
            .sendKeys('#email', 'john.doe@domain.com')
            .click('#order')
            .assert.urlContains('confirmation.html?orderId=');
        browser.expect.element('#orderId').text.to.match(/[0-9a-zA-Z\-]+/);
        browser
            .url(__dirname + '\\..\\..\\dist\\html\\cart.html')
            .assert.not.elementPresent('.cart__item')
            .end();
    });
});
