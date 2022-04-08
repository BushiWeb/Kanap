import { CartProduct } from '../../js/entity/CartProduct';
import { MOCKED_CART_DATA, MOCKED_CART_ENTITY } from '../data/mockedCartData';
import { MOCKED_PRODUCT_ENTITY_DATA } from '../data/mockedProductEntityData';

describe('CartProduct Unit Test Suite', () => {
    const testProduct = MOCKED_CART_DATA.cartData[0];
    let cartProductEntity;

    beforeEach(() => {
        cartProductEntity = MOCKED_CART_ENTITY().products[0];
    });

    describe('Constructor Test Suite', () => {
        it('should create an instance of CartProduct with the right informations', () => {
            const cartProductEntity = new CartProduct(
                testProduct.id,
                testProduct.color,
                testProduct.quantity,
                testProduct.name
            );
            expect(cartProductEntity._id).toBe(testProduct.id);
            expect(cartProductEntity._color).toBe(testProduct.color);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity);
            expect(cartProductEntity._name).toBe(testProduct.name);
        });
    });

    describe('Getters Test Suite', () => {
        it('should return the value of CartProduct._id', () => {
            expect(cartProductEntity.id).toBe(cartProductEntity._id);
        });

        it('should return the value of CartProduct._color', () => {
            expect(cartProductEntity.color).toBe(cartProductEntity._color);
        });

        it('should return the value of CartProduct._quantity', () => {
            expect(cartProductEntity.quantity).toBe(cartProductEntity._quantity);
        });

        it('should return the value of CartProduct._name', () => {
            expect(cartProductEntity.name).toBe(cartProductEntity._name);
        });

        it('should return the value of CartProduct._quantity', () => {
            expect(cartProductEntity.product).toBe(cartProductEntity._product);
        });
    });

    describe('Setters Test Suite', () => {
        it('should set the value of CartProduct._quantity', () => {
            const newQuantity = 8;
            cartProductEntity.quantity = 8;
            expect(cartProductEntity._quantity).toBe(newQuantity);
        });

        it('should set the value of CartProduct._product', () => {
            const newProductEntity = MOCKED_PRODUCT_ENTITY_DATA[1];
            cartProductEntity.product = newProductEntity;
            expect(cartProductEntity._product).toBe(newProductEntity);
        });
    });

    describe('addToQuantity() Method Test Suite', () => {
        const testQuantity = 4;

        it('should add the test quantity to the current quantity', () => {
            cartProductEntity.addToQuantity(testQuantity);
            expect(cartProductEntity._quantity).toBe(testProduct.quantity + testQuantity);
        });
    });

    describe('compare() Method Test Suite', () => {
        const compareCartProduct = new CartProduct('id', 'color', 3, 'name');
        it('should return true if both products are identical', () => {
            compareCartProduct._id = cartProductEntity.id;
            compareCartProduct._color = cartProductEntity.color;
            expect(cartProductEntity.compare(compareCartProduct)).toBe(true);
        });

        it("should return false if the products don't have the same color", () => {
            compareCartProduct._id = cartProductEntity.id;
            compareCartProduct._color = 'color';
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });

        it("should return false if the products don't have the same id", () => {
            compareCartProduct._id = 'id';
            compareCartProduct._color = cartProductEntity.color;
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });

        it("should return false if the products don't have the same id and color", () => {
            compareCartProduct._id = 'id';
            compareCartProduct._color = 'color';
            expect(cartProductEntity.compare(compareCartProduct)).toBe(false);
        });
    });
});
