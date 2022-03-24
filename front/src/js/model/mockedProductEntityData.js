import { MOCKED_API_DATA } from "../dao/mockedApiData";
import { Product } from "../entity/Product";

export const MOCKED_PRODUCT_ENTITY_DATA = (() => {
    let productsResult = [];
    for (let i = 0 ; i < MOCKED_API_DATA.length ; i++) {
        productsResult.push(new Product(
            MOCKED_API_DATA[i]._id,
            MOCKED_API_DATA[i].name,
            MOCKED_API_DATA[i].price,
            MOCKED_API_DATA[i].description,
            MOCKED_API_DATA[i].imageUrl,
            MOCKED_API_DATA[i].altTxt,
            MOCKED_API_DATA[i].colors
        ));
    }
    return productsResult;
})();