import axios from "axios";
import jwtDecode from "jwt-decode";
import {SET_CURRENT_ADMIN, SET_CURRENT_USER} from "../constants";
import {SM4Util} from "../utils/sm4Utils/sm4CryptUtils";
import {setAuthorizationToken} from "../utils/validations/setAuthorizationToken";

//配置加密算法对象
var s4 = new SM4Util()
s4.iv = "ZkR_SiNoSOFT=568"

export const userLoginReq = (data) => {
    return async (dispatch) => {
        const res = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: {
                //加双引号
                "username": data.username,
                "password": s4.encryptData_ECB(data.password)
            },
            url: '/kill/user/login'
        });
        // console.log(res);
        console.log(res.data);
        const {siftState, token} = res.data.result
        // console.log(token);
        // 本地储存token
        localStorage.setItem("loginToken", token);
        // 在请求头中设置AuthorizationToken
        setAuthorizationToken(token);
        // 将当前用户的token存储到redux中
        const user = jwtDecode(token)
        user.siftState = siftState
        console.log(user);
        dispatch(setCurrentUser(user));
    }
}

export const logOut = (userInfo) => {
    return dispatch => {
        //删除本地的token
        localStorage.removeItem("loginToken")
        //删除请求头
        setAuthorizationToken(false);
        //当前登录对象归空,登陆状态变为false
        if (userInfo.identity === 1)
            dispatch(setCurrentAdmin({}))
        else {
            dispatch(setCurrentUser({}))
        }
    }
}

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        data: user
    }
}

export const setCurrentAdmin = (admin) => {
    return {
        type: SET_CURRENT_ADMIN,
        data: admin
    }
}
