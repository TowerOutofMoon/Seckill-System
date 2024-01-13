import axios from "axios";

export const userInfoAddReq = (userData) => {
    return dispatch => {
        return axios.post('/kill/overdueRecord/addInfo',userData)
    }
}

export const userInfoGetReq = (identityNumber) => {
    return dispatch => {
        return axios.get(`/kill/overdueRecord/getOne/${identityNumber}`)
    }
}

export const selectApplyByDate = (startTime,endTime) => {
    return (dispatch) => {
        console.log(startTime,endTime);
        return axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: {
                startTime,
                endTime
            },
            url: '/kill/apply_record/selectByDate'
        })
    }
}

export const getOverdueUserInfoReq = () => {
    return dispatch => {
        // return axios.get('/kill/overdueRecord/join')
        return axios.get('/kill/overdueRecord/join')
    }
}

export const getSuccessUserInfoReq = () => {
    return dispatch => {
        return axios.get('/kill/user/result')
    }
}

export const getApplyUserInfoReq = () => {
    return dispatch => {
        return axios.get('/kill/apply_record/all')
    }
}