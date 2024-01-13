import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions/authAction';
import { connect } from 'react-redux';
import './backstage.css'
import {Menu} from "antd";

class MyHeader extends Component {
    handleLoginOut = () => {
        this.props.logOut(this.props.userInfo)
    }
    render() {
        return (
            <Menu mode='horizontal'>
                <Menu.Item className="site-layout-item" key='1'><Link to='/introduction'>回到主页</Link></Menu.Item>
                <Menu.Item className="site-layout-item" key='2'><Link to='/login' onClick={this.handleLoginOut}>退出登录</Link></Menu.Item>
            </Menu>
        )
    }
}
export default connect(
    state => ({ userInfo: state.auth }),
    {
        logOut: logOut
    }
)(MyHeader)