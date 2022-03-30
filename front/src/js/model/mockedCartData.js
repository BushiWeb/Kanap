import { MOCKED_API_DATA } from "../dao/mockedApiData";

export const MOCKED_CART_DATA = {
    cartData: [
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[0],
            quantity: 2
        },
        {
            id: MOCKED_API_DATA[0]._id,
            color: MOCKED_API_DATA[0].colors[1],
            quantity: 9
        },
        {
            id: MOCKED_API_DATA[3]._id,
            color: MOCKED_API_DATA[3].colors[0],
            quantity: 4
        },
        {
            id: MOCKED_API_DATA[2]._id,
            color: MOCKED_API_DATA[2].colors[0],
            quantity: 2
        },
    ],
    totalQuantity: 2 + 9 + 4 + 2,
    totalPrice: 2 * MOCKED_API_DATA[0].price + 9 * MOCKED_API_DATA[0].price + 4 * MOCKED_API_DATA[3].price + 2 * MOCKED_API_DATA[2].price
}