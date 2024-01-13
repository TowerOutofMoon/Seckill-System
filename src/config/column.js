import {Link} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";
import React from "react";

export const killSuccessPeopleColumn = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: '购买产品',
        dataIndex: 'productName',
        key: 'productName',
    },
    {
        title: '账户金额',
        dataIndex: 'money',
        key: 'money'
    }
]
export const orderColumn = [
    {
        title: '产品名',
        dataIndex: 'productName',
        key: 'productName',
        render: text => <Link to='/product-display'>{text}</Link>,
    },
    {
        title: '购买数量',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',
    },
    {
        title: '订单金额',
        dataIndex: 'orderPrice',
        key: 'orderPrice',
    },
    {
        title: '购买时间',
        dataIndex: 'orderTime',
        key: 'orderTime'
    },
    {
        title: '支付状态',
        dataIndex: 'payStatus',
        key: 'payStatus',
        render: () => <span style={{color: 'green', fontWeight: '700'}}><SmileOutlined
            style={{marginRight: '5px'}}/>成功</span>
    }
]
export const boughtProductsColumn = [
    {
        title: '产品名',
        dataIndex: 'productName',
        key: 'productName',
        render: text => <Link to='/product-display'>{text}</Link>,
    },
    {
        title: '有效时间',
        dataIndex: 'availableTime',
        key: 'availableTime'
    },
    {
        title: '产品收益',
        dataIndex: 'productProfit',
        key: 'productProfit',
    },
]
