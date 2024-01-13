import React, {Component} from 'react'
import 'antd/dist/antd.css';
import './backstage.css'
import {Breadcrumb, Layout, Menu} from 'antd';
import MyHeader from './myHeader';
import {Link, Outlet} from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined
} from "@ant-design/icons";
import MySide from "./mySide";
import {Typography} from "antd";
import {topMenu} from "../../config/menu";
const {Text} = Typography
const {Header, Footer, Sider, Content} = Layout;
export default class backstage extends Component {
    state = {
        collapsed: false
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <MySide/>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <MyHeader/>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item><Link to='/introduction'><HomeOutlined/>首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item overlay={topMenu}><Link
                                to='/admin'><UserOutlined/>管理界面</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}><Text>BackStage For Administration © Sanxiang Bank 2022</Text></Footer>
                </Layout>
            </Layout>
        );
    }
}
