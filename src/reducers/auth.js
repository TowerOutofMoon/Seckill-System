import {SET_CURRENT_ADMIN, SET_CURRENT_USER} from "../constants";
import {isEmpty} from "lodash";

const initState = {
    user: {},
    admin: {},
    isAuthenticated: false, //判断用户是否登录
    identity: -1, //判断登录身份
}
// 授权计数器
const auth = (state = initState, action) => {
    const {type, data} = action
    switch (type) {
        case SET_CURRENT_USER:
            return {
                user: data,
                isAuthenticated: !isEmpty(data),
                identity: isEmpty(data) ? -1 : 0
            }
        case SET_CURRENT_ADMIN:
            return {
                user: data,
                isAuthenticated: !isEmpty(data),
                identity: isEmpty(data) ? -1 : 1
            }
        default:
            return state
    }
}

export default auth;