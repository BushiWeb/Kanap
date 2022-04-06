import { Cart } from '../../js/entity/Cart';
import { CartProduct } from '../../js/entity/CartProduct';
import { MOCKED_API_DATA } from '../data/mockedApiData';

const mockAddToQuantity = jest.fn();
const mockGetData = jest.fn();
const mockCompare = jest.fn();
jest.mock('../../js/entity/CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation((id, color, quantity) => {
            return {
                id: id,
                color: color,
                quantity: quantity,
                addToQuantity: mockAddToQuantity,
                getData: mockGetData,
                compare: mockCompare,
            };
        }),
    };
});

beforeEach(() => {
    mockAddToQuantity.mockClear();
    mockGetData.mockClear();
    CartProduct.mockClear();
});

describe('Cart Unit Test Suite', () => {
    const testProducts = [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            name: MOCKED_API_DATA[0].name,
            quantity: 4,
        },
        {
            id: MOCKED_API_DATA[1]._id,
            color: MOCKED_API_DATA[1].colors[0],
            name: MOCKED_API_DATA[1].name,
            quantity: 4,
        },
    ];

    const testCartProductEntity = new CartProduct(
        testProducts[0].id,
        testProducts[0].color,
        testProducts[0].quantity,
        testProducts[0].name
    );

    describe('Constructor Test Suite', () => {
        const productsSetterMock = jest.spyOn(Cart.prototype, 'products', 'set');

        beforeEach(() => {
            productsSetterMock.mockReset();
        });

        afterAll(() => {
            productsSetterMock.mockRestore();
        });

        it('should call the products setter', () => {
            const cartProductEntity = new Cart([testCartProductEntity]);

            expect(productsSetterMock).toHaveBeenCalled();
            expect(productsSetterMock).toHaveBeenCalledWith([testCartProductEntity]);
        });
    });

    describe('Getters Test Suite', () => {
        const cartEntity = new Cart();
        const mockUpdatePrice = jest.spyOn(cartEntity, 'updateTotalPrice');
        const mockUpdateQuantity = jest.spyOn(cartEntity, 'updateTotalQuantity');

        beforeEach(() => {
            mockUpdatePrice.mockReset();
            mockUpdateQuantity.mockReset();
        });
        afterAll(() => {
            mockUpdatePrice.mockRestore();
            mockUpdateQuantity.mockRestore();
        });

        it('should return the value of Cart._products', () => {
            cartEntity._products = testProducts[0];
            expect(cartEntity.products).toBe(cartEntity._products);
        });

        it('should return the value of Cart._totalQuantity', () => {
            cartEntity._totalQuantity = 20;
            expect(cartEntity.totalQuantity).toBe(cartEntity._totalQuantity);
        });

        it('should call updateTotalQuantity() if the total quantity is undefined', () => {
            cartEntity._totalQuantity = undefined;
            cartEntity.totalQuantity;
            expect(mockUpdateQuantity).toHaveBeenCalled();
        });

        it('should return the value of Cart._totalPrice', () => {
            cartEntity._totalPrice = 20;
            expect(cartEntity.totalPrice).toBe(cartEntity._totalPrice);
        });

        it('should call updateTotalPrice() if the total price is undefined', () => {
            cartEntity._totalPrice = undefined;
            cartEntity.totalPrice;
            expect(mockUpdatePrice).toHaveBeenCalled();
        });
    });

    describe('Setters Test Suite', () => {
        const cartEntity = new Cart();

        it('should set the value of Cart._products by calling the CartProduct constructor', () => {
            cartEntity.products = [testCartProductEntity];

            expect(cartEntity._products).toEqual([testCartProductEntity]);
        });
    });

    describe('addProduct() Test Suite', () => {
        const cartEntity = new Cart();

        const searchProductMock = jest.spyOn(Cart.prototype, 'searchProduct');
        const mockUpdateTotals = jest.spyOn(cartEntity, 'updateTotals');

        beforeEach(() => {
            searchProductMock.mockReset();
            mockUpdateTotals.mockReset();
        });

        it("should change the product's quantity if it is already in the cart", () => {
            searchProductMock.mockReturnValue(0);
            cartEntity._products = [new CartProduct()];
            cartEntity.addProduct(testCartProductEntity);
            expect(mockAddToQuantity).toHaveBeenCalled();
        });

        it('should add the product to the cart', () => {
            const pushMock = jest.spyOn(Array.prototype, 'push');
            searchProductMock.mockReturnValue(false);
            cartEntity.addProduct(testCartProductEntity);
            expect(pushMock).toHaveBeenCalled();
            pushMock.mockRestore();
        });

        it('should update the totals', () => {
            searchProductMock.mockReturnValue(0);
            cartEntity._products = [new CartProduct()];
            cartEntity.addProduct(testCartProductEntity);
            expect(mockUpdateTotals).toHaveBeenCalled();
        });
    });

    describe('updateProductQuantity() Test Suite', () => {
        const mockSearchProduct = jest.spyOn(Cart.prototype, 'searchProduct');
        const mockUpdateTotals = jest.spyOn(Cart.prototype, 'updateTotals');
        const mockDeleteProduct = jest.spyOn(Cart.prototype, 'deleteProduct');
        const cartEntity = new Cart();

        beforeEach(() => {
            mockSearchProduct.mockReset();
            mockUpdateTotals.mockReset();
            mockDeleteProduct.mockReset();
        });

        afterAll(() => {
            mockDeleteProduct.mockRestore();
        });

        it('should use the deleteProduct() method if the quantity is 0', () => {
            cartEntity.updateProductQuantity(testCartProductEntity, 0);
            expect(mockDeleteProduct).toHaveBeenCalled();
        });

        it('should use the searchProduct() method', () => {
            cartEntity._products = [];
            mockSearchProduct.mockReturnValue(false);
            cartEntity.updateProductQuantity(testCartProductEntity, 1);
            expect(mockSearchProduct).toHaveBeenCalled();
        });

        it('should update the right element in the products array if searchProduct returns a number', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            cartEntity.updateProductQuantity(testCartProductEntity, 1);
            expect(cartEntity._products[0].quantity).toBe(1);
        });

        it('should use the updateTotals() method if searchProduct returns a number', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            cartEntity.updateProductQuantity(testCartProductEntity, 1);
            expect(mockUpdateTotals).toHaveBeenCalled();
        });

        it('should return true if the product exists', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            const result = cartEntity.updateProductQuantity(testCartProductEntity, 1);
            expect(result).toBe(true);
        });

        it("should return false if the product doesn't exist", () => {
            cartEntity._products = [];
            mockSearchProduct.mockReturnValue(false);
            const result = cartEntity.updateProductQuantity(testCartProductEntity, 1);
            expect(result).toBe(false);
        });
    });

    describe('deleteProduct() Test Suite', () => {
        const mockSearchProduct = jest.spyOn(Cart.prototype, 'searchProduct');
        const mockUpdateTotals = jest.spyOn(Cart.prototype, 'updateTotals');
        const cartEntity = new Cart();

        beforeEach(() => {
            mockSearchProduct.mockReset();
            mockUpdateTotals.mockReset();
        });

        afterAll(() => {
            mockSearchProduct.mockRestore();
            mockUpdateTotals.mockRestore();
        });

        it('should use the searchProduct() method', () => {
            cartEntity.deleteProduct(testCartProductEntity);
            expect(mockSearchProduct).toHaveBeenCalled();
        });

        it('should delete the right element in the products array if searchProduct returns a number', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            cartEntity.deleteProduct(testCartProductEntity);
            expect(cartEntity._products.length).toBe(0);
        });

        it('should use the updateTotals() method if searchProduct returns a number', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            cartEntity.deleteProduct(testCartProductEntity);
            expect(mockUpdateTotals).toHaveBeenCalled();
        });

        it('should return true if the product exists', () => {
            cartEntity._products = [testCartProductEntity];
            mockSearchProduct.mockReturnValue(0);
            const result = cartEntity.deleteProduct(testCartProductEntity);
            expect(result).toBe(true);
        });

        it("should return false if the product doesn't exist", () => {
            cartEntity._products = [];
            mockSearchProduct.mockReturnValue(false);
            const result = cartEntity.deleteProduct(testCartProductEntity);
            expect(result).toBe(false);
        });
    });

    describe('searchProduct() Test Suite', () => {
        const testProductToSearch = new CartProduct(
            MOCKED_API_DATA[0]._id,
            MOCKED_API_DATA[0].colors[0],
            4,
            MOCKED_API_DATA[0].name
        );
        const testProductToPopulate = new CartProduct(
            MOCKED_API_DATA[1]._id,
            MOCKED_API_DATA[1].colors[0],
            4,
            MOCKED_API_DATA[1].name
        );
        const cartEntity = new Cart();

        it('should return the index of the product', () => {
            cartEntity._products = [testProductToPopulate, testProductToSearch];
            mockCompare.mockReturnValueOnce(false).mockReturnValueOnce(true);
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(1);
        });

        it('should return false if the product is not in the cart', () => {
            cartEntity._products = [testProductToPopulate];
            mockCompare.mockReturnValue(false);
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same ID', () => {
            testProductToPopulate._color = MOCKED_API_DATA[1].colors[0];
            testProductToPopulate._id = testProductToSearch.id;
            cartEntity._products = [testProductToPopulate];
            mockCompare.mockReturnValue(false);
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same color', () => {
            testProductToPopulate._color = testProductToSearch.color;
            testProductToPopulate._id = MOCKED_API_DATA[1]._id;
            cartEntity._products = [testProductToPopulate];
            mockCompare.mockReturnValue(false);
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });
    });

    describe('updateTotals() Test Suite', () => {
        const cartEntity = new Cart();

        const mockUpdatePrice = jest.spyOn(cartEntity, 'updateTotalPrice');
        const mockUpdateQuantity = jest.spyOn(cartEntity, 'updateTotalQuantity');

        beforeEach(() => {
            mockUpdatePrice.mockReset();
            mockUpdateQuantity.mockReset();
        });

        afterAll(() => {
            mockUpdatePrice.mockRestore();
            mockUpdateQuantity.mockRestore();
        });

        it('should call the updateTotalPrice() method', () => {
            cartEntity.updateTotals();
            expect(mockUpdatePrice).toHaveBeenCalled();
        });

        it('should call the updateTotalQuantity() method', () => {
            cartEntity.updateTotals();
            expect(mockUpdateQuantity).toHaveBeenCalled();
        });
    });
});
