import {nanoid} from "nanoid";
import {findIndex} from "lodash";
import {ADD_PRODUCT, DELETE_PRODUCT, STORE_PRODUCTS, UPDATE_PRODUCT} from "../constants";

const initState = [];
const products = (state = initState, action) => {
    const {type, data} = action
    switch (type) {

        case ADD_PRODUCT:
            return [...state, {
                key: nanoid(),
                seckillProductName: data.seckillProductName,
                seckillProductPrice: data.seckillProductPrice,
                seckillProductAmount: data.seckillProductAmount,
                seckillTime: data.seckillTime,
                seckillEnd: data.seckillEnd,
                // seckillProductImages: data.seckillProductImages
            }]

        case DELETE_PRODUCT:
            const index = findIndex(state, {seckillProductId: data})
            if (index >= 0) {
                const newState = [...state.slice(0, index), ...state.slice(index + 1)]
                return newState
            }
            return state

        case STORE_PRODUCTS:
            const products = data
            console.log('@Myproducts', products);
            if (products.length > 0 && state.length === 0) {
                products.map((productObj) => {
                    state = [...state,
                        {
                            key: productObj.seckillProductId,
                            seckillProductId: productObj.seckillProductId,
                            seckillProductName: productObj.seckillProductName,
                            seckillProductPrice: productObj.seckillProductPrice,
                            seckillProductAmount: productObj.seckillProductAmount,
                            seckillTime: new Date(productObj.seckillTime).toLocaleString(),
                            seckillEnd: new Date(productObj.seckillEnd).toLocaleString(),
                            // seckillProductImages: '图片'
                        }]
                })
            }
            return state

        case UPDATE_PRODUCT:
            const i = findIndex(state, {seckillProductId: data.seckillProductId})
            if (i >= 0) {
                state[i].seckillProductName = data.seckillProductName
                state[i].seckillProductPrice = data.seckillProductPrice
                state[i].seckillProductAmount = data.seckillProductAmount
                state[i].seckillTime = data.seckillTime
                state[i].seckillEnd = data.seckillEnd
            }
            return state

        default:
            return state
    }
}

export default products;
