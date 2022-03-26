import { Cart } from "./Cart";
import { CartProduct } from './CartProduct';
import { MOCKED_API_DATA } from '../dao/mockedApiData';

const mockAddToQuantity = jest.fn();
const mockGetData = jest.fn();
const mockCompare = jest.fn();
jest.mock('./CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation((id, color, quantity) => {
            return {
                id: id,
                color: color,
                quantity: quantity,
                addToQuantity: mockAddToQuantity,
                getData: mockGetData,
                compare: mockCompare
            };
        })
    }
});

beforeEach(() => {
    mockAddToQuantity.mockClear();
    mockGetData.mockClear();
    CartProduct.mockClear();
})

describe('Cart Unit Test Suite', () => {
    const testProducts = [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 4
        },
        {
            id: MOCKED_API_DATA[1]._id,
            color: MOCKED_API_DATA[1].colors[0],
            quantity: 4
        }
    ];

    const testCartProductEntity = new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity);

    describe('Constructor Test Suite', () => {
        const productsSetterMock = jest.spyOn(Cart.prototype, 'products', 'set');

        beforeEach(() => {
            productsSetterMock.mockReset();
        });

        afterAll(() => {
            productsSetterMock.mockRestore();
        });

        it('should call the products setter', () => {


            const cartProductEntity = new Cart(testProducts);

            expect(productsSetterMock).toHaveBeenCalled();
            expect(productsSetterMock).toHaveBeenCalledWith(testProducts);
        });
    });


    describe('Getters Test Suite', () => {
        const cartEntity = new Cart();

        it('should return the value of Cart._products', () => {
            cartEntity._products = testProducts[0];
            expect(cartEntity.products).toBe(cartEntity._products);
        });
    });


    describe('Setters Test Suite', () => {
        const cartEntity = new Cart();

        it('should set the value of Cart._products by calling the CartProduct constructor', () => {
            cartEntity.products = testProducts;

            expect(cartEntity._products).toBe(testProducts);
        });
    });


    describe('addProduct() Test Suite', () => {
        const cartEntity = new Cart();

        const searchProductMock = jest.spyOn(Cart.prototype, 'searchProduct');

        beforeEach(() => {
            searchProductMock.mockReset();
        });

        afterAll(() => {
            searchProductMock.mockRestore();
        });

        it('should change the product\'s quantity if it is already in the cart', () => {
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
    });


    describe('searchProduct() Test Suite', () => {
        const testProductToSearch = new CartProduct(MOCKED_API_DATA[0]._id, MOCKED_API_DATA[0].colors[0], 4);
        const testProductToPopulate = new CartProduct(MOCKED_API_DATA[1]._id, MOCKED_API_DATA[1].colors[0], 4);
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
});