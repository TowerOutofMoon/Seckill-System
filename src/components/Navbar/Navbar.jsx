import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Link, Outlet} from 'react-router-dom';

import withRouter from '../../withRouter'

import {logOut} from '../../actions/authAction';

import logo from '../images/logo.png'

import './navbar.css'


class Navbar extends Component {
    //退出登录处理
    handleLoginOut = (userInfo) => {
        this.props.logOut(userInfo)
        this.props.navigate('/introduction')
    }

    render() {
        const {userInfo} = this.props
        console.log(userInfo);
        const {user, identity, isAuthenticated} = userInfo
        // console.log(user, isAuthenticated);
        //登录前显示的导航栏
        const beforeLogin = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">登录</Link></li>
                <li><Link to="/register">注册</Link></li>
            </ul>
        )
        //登陆后显示的导航栏
        const afterLogin = (
            <ul className="nav navbar-nav navbar-right">
                <p className='navbar-text'>
                    欢迎您
                    <span style={{color: '#1054d5', fontSize: '16px', fontWeight: '700', marginLeft: '15px'}}>
                        {identity === 0 ? user.username : '管理员' + user.adminName}
                    </span>
                </p>
                <Link to='/my-product' className="navbar-text navbar-link navbar-item">我的商品</Link>
                <Link to='/my-order' className="navbar-text navbar-link navbar-item">我的订单</Link>
                <a href="#" className="navbar-text navbar-link navbar-item"
                   onClick={(userInfo) => this.handleLoginOut(userInfo)}>退出登录</a>
            </ul>
        )


        return (
            <div>
                <nav className="navbar navbar-default" style={{marginBottom: "0px"}}>
                    <div className="container-fluid">
                        {/*导航栏左侧*/}
                        <div className="navbar-header">
                            {/* 在a标签内加入logo图片 */}
                            <a className="navbar-brand" href="#">
                                <img src={logo} alt="三湘银行" style={{marginTop: '-10px'}}/>
                            </a>
                        </div>
                        {/*导航栏右侧*/}
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                {/*<li><Link to="/product-sale" style={{height: '60px'}}>商品秒杀</Link></li>*/}
                                <li><Link to="/introduction" style={{height: '60px'}}>银行介绍</Link></li>
                                <li><Link to="/product-display" style={{height: '60px'}}>产品推荐</Link></li>
                                {(identity === 1) &&
                                <li><Link to="/admin" style={{height: '60px'}}>管理界面</Link></li>}
                            </ul>
                            {/* navbar-nav令其水平排列 */}
                            {isAuthenticated ? afterLogin : beforeLogin}
                        </div>
                    </div>
                </nav>
                <Outlet/>
                <footer className='navbar-footer'>
                    <div className='navbar-footer-content'>
                        <ul className='navbar-footer-list'>
                            <li className='navbar-footer-list-item'><Link to="/introduction">关于我们</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/introduction">联系我们</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/introduction">人才招聘</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/product-display">商家入驻</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/product-display">金融服务</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/product-display">手机银行</Link></li>
                            <li className='navbar-footer-list-item'><Link to="/product-display">友情链接</Link></li>
                        </ul>
                    </div>
                </footer>
            </div>
        );
    }
}

export default connect(
    state => ({userInfo: state.auth}),
    {
        logOut: logOut
    }
)(withRouter(Navbar))