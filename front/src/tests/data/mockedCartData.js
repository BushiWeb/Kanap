import { MOCKED_API_DATA } from './mockedApiData';
import { MOCKED_PRODUCT_ENTITY_DATA } from './mockedProductEntityData';
import { Cart } from '../../js/entity/Cart';
import { CartProduct } from '../../js/entity/CartProduct';

export const MOCKED_CART_DATA = {
    cartData: [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 2,
            name: MOCKED_API_DATA[0].name,
        },
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[1],
            quantity: 9,
            name: MOCKED_API_DATA[0].name,
        },
        {
            id: MOCKED_API_DATA[3]._id,
            color: MOCKED_API_DATA[3].colors[0],
            quantity: 4,
            name: MOCKED_API_DATA[3].name,
        },
        {
            id: MOCKED_API_DATA[2]._id,
            color: MOCKED_API_DATA[2].colors[0],
            quantity: 2,
            name: MOCKED_API_DATA[2].name,
        },
        {
            id: 'invalid',
            color: 'blue',
            quantity: 2,
            name: 'false name',
        },
        {
            id: 'invalid2',
            color: 'green',
            quantity: 2,
            name: 'false name 2',
        },
    ],
    totalQuantity: 2 + 9 + 4 + 2,
    totalPrice:
        2 * MOCKED_API_DATA[0].price +
        9 * MOCKED_API_DATA[0].price +
        4 * MOCKED_API_DATA[3].price +
        2 * MOCKED_API_DATA[2].price,
};

export const MOCKED_CART_ENTITY = () => {
    const returnEntity = new Cart();
    returnEntity.products = [
        new CartProduct(
            MOCKED_CART_DATA.cartData[0].id,
            MOCKED_CART_DATA.cartData[0].color,
            MOCKED_CART_DATA.cartData[0].quantity,
            MOCKED_CART_DATA.cartData[0].name,
            MOCKED_PRODUCT_ENTITY_DATA[0]
        ),
        new CartProduct(
            MOCKED_CART_DATA.cartData[1].id,
            MOCKED_CART_DATA.cartData[1].color,
            MOCKED_CART_DATA.cartData[1].quantity,
            MOCKED_CART_DATA.cartData[1].name,
            MOCKED_PRODUCT_ENTITY_DATA[0]
        ),
        new CartProduct(
            MOCKED_CART_DATA.cartData[2].id,
            MOCKED_CART_DATA.cartData[2].color,
            MOCKED_CART_DATA.cartData[2].quantity,
            MOCKED_CART_DATA.cartData[2].name,
            MOCKED_PRODUCT_ENTITY_DATA[3]
        ),
        new CartProduct(
            MOCKED_CART_DATA.cartData[3].id,
            MOCKED_CART_DATA.cartData[3].color,
            MOCKED_CART_DATA.cartData[3].quantity,
            MOCKED_CART_DATA.cartData[3].name,
            MOCKED_PRODUCT_ENTITY_DATA[2]
        ),
    ];
    return returnEntity;
};
