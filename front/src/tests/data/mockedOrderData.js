import { MOCKED_API_DATA } from './mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from './mockedProductEntityData';
import { MOCKED_CART_DATA, MOCKED_CART_ENTITY } from './mockedCartData';

export const MOCKED_ORDER_DATA = () => {
    return {
        contact: {
            firstName: 'Kal',
            lastName: 'El',
            address: 'Fortress of solitude',
            city: 'Arctic',
            email: 'superman@justice-league.com',
        },
        products: [
            MOCKED_CART_DATA.cartData[0].id,
            MOCKED_CART_DATA.cartData[1].id,
            MOCKED_CART_DATA.cartData[2].id,
            MOCKED_CART_DATA.cartData[3].id,
        ],
    };
};

export const MOCKED_ORDER_DATA_RETURNED = () => {
    let data = MOCKED_CART_ENTITY();
    return {
        contact: {
            firstName: 'Kal',
            lastName: 'El',
            address: 'Fortress of solitude',
            city: 'Arctic',
            email: 'superman@justice-league.com',
        },
        products: [
            data.products[0].product,
            data.products[1].product,
            data.products[2].product,
            data.products[3].product,
        ],
        orderId: '123',
    };
};
