import { Cart } from "./Cart";
import { CartProduct } from './CartProduct';
import { MOCKED_API_DATA } from '../dao/mockedApiData';

const mockAddToQuantity = jest.fn();
const mockGetData = jest.fn();
jest.mock('./CartProduct', () => {
    return {
        CartProduct: jest.fn().mockImplementation((id, color, quantity) => {
            return {
                id: id,
                color: color,
                quantity: quantity,
                addToQuantity: mockAddToQuantity,
                getData: mockGetData
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

            expect(CartProduct).toHaveBeenCalledTimes(testProducts.length);
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
            cartEntity.addProduct(testProducts[0]);
            expect(mockAddToQuantity).toHaveBeenCalled();
        });

        it('should add the product to the cart', () => {
            const pushMock = jest.spyOn(Array.prototype, 'push');
            searchProductMock.mockReturnValue(false);
            cartEntity.addProduct(testProducts[0]);
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
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(1);
        });

        it('should return false if the product is not in the cart', () => {
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same ID', () => {
            testProductToPopulate._color = MOCKED_API_DATA[1].colors[0];
            testProductToPopulate._id = testProductToSearch.id;
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });

        it('should return false if the product is not in the cart but a product has the same color', () => {
            testProductToPopulate._color = testProductToSearch.color;
            testProductToPopulate._id = MOCKED_API_DATA[1]._id;
            cartEntity._products = [testProductToPopulate];
            const searchResult = cartEntity.searchProduct(testProductToSearch);
            expect(searchResult).toBe(false);
        });
    });


    describe('getData() Method Test Suite', () => {
        const cartEntity = new Cart();
        cartEntity._products = [new CartProduct(testProducts[0].id, testProducts[0].color, testProducts[0].quantity), new CartProduct(testProducts[1].id, testProducts[1].color, testProducts[1].quantity)];

        it('should call the CartProduct.getData() method as many times as the number of products', () => {
            cartEntity.getData();
            expect(mockGetData).toHaveBeenCalledTimes(cartEntity._products.length);
        });

        it('should return an array of cart products object data', () => {
            mockGetData.mockReturnValueOnce(testProducts[0]).mockReturnValueOnce(testProducts[1]);
            const data = cartEntity.getData();
            expect(data).toEqual(testProducts);
        });
    });
});