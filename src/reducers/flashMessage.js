import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "../constants";
import { findIndex } from "lodash";
import { nanoid } from "nanoid";

//state初始化是一个空数组或者空对象，这里是空数组
const flashMessage = (state = [], action) => {
    const { data, type } = action
    switch (type) {
        case ADD_FLASH_MESSAGE:
            return [...state, {
                id: nanoid(),
                type: data.type,
                text: data.text,
            }]

        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state, { id: action.data })
            // console.log('DELETE执行了');
            if (index >= 0) {
                const newState = [...state.slice(0, index), ...state.slice(index + 1)]
                return newState
            }
            return state

        default:
            return state;
    }
}

export default flashMessage