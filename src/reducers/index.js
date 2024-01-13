// 合并reducer文件

import { combineReducers } from "redux";
import auth from './auth'
import flashMessage from './flashMessage'
import products from "./products";
import users from "./users"

const rootReducer = combineReducers({
    auth,
    flashMessage,
    products,
    users
})

export default rootReducer;