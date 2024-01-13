import React, {Component} from 'react';
import {Breadcrumb, Col, Row, Table} from "antd";
import {Link} from "react-router-dom";
import {ShoppingCartOutlined, SmileOutlined} from "@ant-design/icons";
import {boughtProductsColumn} from "../../config/column";


class MyProducts extends Component {
    state = {
        products: [
            {
                productName: '活化收益',
                availableTime: '2022年03月23日 至 2025年03月23日',
                productProfit: '12500元',
            },
            {
                productName: '正信房地产',
                availableTime: '2022年05月01日 至 2023年01月31日',
                productProfit: '11450元',
            },
        ]
    }
    columns = boughtProductsColumn

    render() {
        return (
            <div className="user-products-page">
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/introduction">首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>我的商品</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={4}/>
                </Row>
                <Row>
                    <Col span={4}/>
                    <Col span={16} className="user-products-content">
                        <p style={{marginBottom: '20px', fontSize: '20px'}}><ShoppingCartOutlined/>【我的商品】</p>
                        <p style={{fontSize: '18px', fontWeight: '700'}}>商品详情</p>
                        <Table dataSource={this.state.products} columns={this.columns}/>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        );
    }
}

export default MyProducts;