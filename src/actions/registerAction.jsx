import axios from 'axios'
import { SM4Util } from "../utils/sm4Utils/sm4CryptUtils";
// 网络请求的异步操作,不是写入到redux中的数据:redux-thunk
// 配置了中间件thunk,于是dispatch可以传函数参数

//配置加密算法对象
var s4 = new SM4Util()
s4.iv = "ZkR_SiNoSOFT=568"

export const userRegisterReq = (userData) => {
    return (dispatch) => {
        return axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: {
                cardNumber: userData.cardNumber,
                identityNumber: userData.identityNumber,
                phoneNumber: userData.phoneNumber,
                password: s4.encryptData_ECB(userData.password),
                username: userData.username
            },
            url: '/kill/user/register'
        })
    }
}

export const userCheckUserReq = (username) => {
    return (dispatch) => {
        return axios.get('/kill/user/check/' + username)
    }
}
