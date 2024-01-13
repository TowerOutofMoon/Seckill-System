import React, {Component} from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {HomeOutlined,EditOutlined,UserOutlined} from "@ant-design/icons";
import './adminIndex.css'
import {Link, Outlet} from "react-router-dom";
import logo from '../images/title.png'
const { Header, Content, Footer } = Layout;

const menu = (
    <Menu>
        <Menu.Item key='1'>
            <Link to='/admin-use/admin-register'>
                注册
            </Link>
        </Menu.Item>
        <Menu.Item key='2'>
            <Link to='/admin-use/admin-login'>
                登录
            </Link>
        </Menu.Item>
    </Menu>
)
class AdminIndex extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" ><Link to='/introduction'><img src={logo}/><span className='title'>湖南三湘银行</span></Link></div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key='1'><Link to='/admin-use/admin-register'>注册</Link></Menu.Item>
                        <Menu.Item key='2'><Link to='/admin-use/admin-login'>登录</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to='/introduction'><HomeOutlined />首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item overlay={menu}><Link to='/admin-use/admin-register'><UserOutlined />管理员界面</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>SanXiang Bank ©2022 For Administration</Footer>
            </Layout>
        );
    }
}

export default AdminIndex;