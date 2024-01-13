import axios from 'axios'
import { ADD_PRODUCT, DELETE_PRODUCT, DELETE_USER, STORE_PRODUCTS, UPDATE_PRODUCT, ADD_USER, STORE_USERS } from '../constants'
import {setAuthorizationToken} from "../utils/validations/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import {setCurrentAdmin, setCurrentUser} from "./authAction";
import {SM4Util} from "../utils/sm4Utils/sm4CryptUtils";

//配置加密算法对象
var s4 = new SM4Util()
s4.iv = "ZkR_SiNoSOFT=568"

///用户的增删改查
export const deleteUser = (userId) => {
    return {
        type: DELETE_USER,
        data: userId
    }
}

export const addUser = (userData) => {
    return {
        type: ADD_USER,
        data: userData
    }
}

export const storeUsers = (users) => {
    return {
        type: STORE_USERS,
        data: users
    }
}

export const showUsersReq = () => {
    return (dispatch) => {
        return axios.get('/kill/user/allUsers')
    }
}

//产品的增删改查
export const addProduct = (productData) => {
    return {
        type: ADD_PRODUCT,
        data: productData
    }
}

export const deleteProduct = (productID) => {
    return {
        type: DELETE_PRODUCT,
        data: productID
    }
}

export const updateProduct = (productData) => {
    return {
        type: UPDATE_PRODUCT,
        data: productData
    }
}

export const storeProducts = (products) => {
    return {
        type: STORE_PRODUCTS,
        data: products
    }
}

export const addProductReq = (product) => {
    return (dispatch) => {
        return axios.post('/kill/seckillProduct/insert', product)
    }
}

export const deleteProductReq = (productId) => {
    return (dispatch) => {
        return axios.post('/kill/seckillProduct/delete', productId)
    }
}

export const updateProductReq = (product) => {
    return (dispatch) => {
        return axios.post('/kill/seckillProduct/update', product)
    }
}

export const deleteUserReq = (userId) => {
    return (dispatch) => {
        return axios.post('/kill/user/deleteById',userId)
    }
}

export const addUserReq = (userData) => {
    return (dispatch) => {
        return axios.post('/api/admin/users/add',userData)
    }
}

//管理员登陆注册
export const adminRegisterReq = (adminData) => {
    adminData.password = s4.encryptData_ECB(adminData.password)
    return (dispatch) => {
        return axios.post('/kill/admin/register',adminData)
    }
}

export const adminLoginReq = (data) => {
    return async (dispatch) => {
        const res = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: {
                //加双引号
                "adminName": data.adminName,
                "password": s4.encryptData_ECB(data.password)
            },
            url: '/kill/admin/login'
        });
        console.log(res);
        const { token } = res.data.result
        // console.log(token);
        // 本地储存token
        // console.log(token);
        localStorage.setItem("loginToken", token);
        // 在请求头中设置AuthorizationToken
        setAuthorizationToken(token);
        // 将当前用户的token存储到redux中
        const admin = jwtDecode(token)
        // console.log(admin);
        dispatch(setCurrentAdmin(admin));
    }
}

//公司账户
export const getCompanyAccount = () => {
    return (dispatch) => {
        return axios.get('/kill/admin/info')
    }
}