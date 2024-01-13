import axios from "axios";

export const productSearchReq = (productName) => {
    return dispatch => {
        // return axios.get(`/kill/product/search/:${productName}`)
        return axios({
            method: 'get',
            url: `/kill/product/search/` + encodeURI(`${productName}`),
            contentType: 'application/json; charset=utf-8',
        })
    }
}

export const productInfoAddReq = (productData) => {
    return dispatch => {
        return axios.post('/kill/product/add', productData)
    }
}

export const allProductInfoReq = () => {
    return dispatch => {
        return axios.get('/kill/product/all');
    }
}