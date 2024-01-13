import {findIndex} from "lodash";
import {ADD_USER, DELETE_USER, STORE_USERS} from "../constants";

const initState = []
const users = (state = initState, action) => {
    const { type, data } = action
    switch (type) {
        case ADD_USER:
            state = [...state, {
                key: data.key,
                username: data.username,
                password: data.password,
                accountNumber: data.accountNumber,
                identityNumber: data.identityNumber,
                phoneNumber: data.phoneNumber
            }]
            return state

        case DELETE_USER:
            const index = findIndex(state, { key: data })
            if (index > 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state

        case STORE_USERS:
            const users = data
            // console.log(users);
            if (users.length > 0 && state.length === 0) {
                users.map((userObj) => {
                    state = [...state,
                    {
                        key: userObj.id,
                        username: userObj.username,
                        password: userObj.password,
                        phoneNumber: userObj.phoneNumber,
                        identityNumber: userObj.identityNumber,
                        accountNumber: userObj.accountNumber,
                        description: userObj.username.toLowerCase() === 'admin' ? '管理员账户' : 'Not Expandable',
                    }]
                })
            }
            return state

        default:
            return state
    }
}
export default users;