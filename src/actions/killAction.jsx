import axios from "axios";

export const getPurchaseLink = (seckillProductId) => {
    return (dispatch) => {
        return axios.get(`/kill/seckillProduct/getLink?id=${seckillProductId}`)
    }
}

export const viewProductReq = () => {
    return (dispatch) => {
        return axios.get('/kill/seckillProduct/getSecKillProducts')
    }
}

export const postOrder = (orderId,url) => {
    return (dispatch) => {
        return axios({
            headers: {
                'Content-Type':'application/json',
            },
            method: 'post',
            data: {
                productId: orderId
            },
            url: `/kill/seckillProduct/${url}/doSeckill`
        })
    }
}

export const viewOrder = () => {
    return (dispatch) => {
        return axios.get('/kill/seckill_order/order')
    }
}