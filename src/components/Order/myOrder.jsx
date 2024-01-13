import React, {Component} from 'react';
import {Row, Col, Breadcrumb, Descriptions, Table} from "antd";
import {ShoppingCartOutlined, SmileOutlined} from "@ant-design/icons";
import {connect} from 'react-redux';
import {viewOrder} from "../../actions/killAction";
import {Link} from "react-router-dom";
import {orderColumn} from "../../config/column";
class MyOrder extends Component {

    state = {
        orders: [
            {
                key: '1',
                productName: '产品名',
                purchaseAmount: 1,
                orderPrice: 900,
                orderTime: '时间'
            }]
    }

    columns = orderColumn

    componentDidMount() {
        this.props.viewOrder().then(
            (res) => {
                const myOrders = res.data.result;
                this.setState({orders:[]})
                // console.log(myOrders);
                myOrders.map((orderObj) => {
                    let order = {};
                    order.key = orderObj.orderId
                    order.productName = orderObj.productName
                    order.purchaseAmount = orderObj.purchaseAmount
                    order.orderPrice = orderObj.orderPrice
                    order.orderTime = new Date(orderObj.orderTime).toLocaleString()
                    this.setState({orders: [...this.state.orders, order]})
                })
                console.log(this.state.orders)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div className="order-page">
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/introduction">首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>我的订单</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={4}/>
                </Row>
                <Row>
                    <Col span={4}/>
                    <Col span={16} className="order-content">
                        <p style={{marginBottom: '20px', fontSize: '20px'}}><ShoppingCartOutlined/>【我的订单】</p>
                        <p style={{fontSize: '18px', fontWeight: '700'}}>订单详情</p>
                        <Table dataSource={this.state.orders} columns={this.columns}/>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        );
    }
}

export default connect(
    null,
    {
        viewOrder: viewOrder
    }
    // mapDispatchToProps
)(MyOrder)