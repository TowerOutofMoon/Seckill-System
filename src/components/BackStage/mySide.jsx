import React, {Component} from 'react'
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import withRouter from '../../withRouter';
import logo from '../images/title.png'
import {
    BankOutlined,
    BarsOutlined, HighlightOutlined,
    HomeOutlined,
    IdcardOutlined, LineChartOutlined,
    MailOutlined, MoneyCollectOutlined,
    PieChartOutlined, PlusOutlined,
    SearchOutlined,
    TeamOutlined
} from "@ant-design/icons";

const {SubMenu} = Menu

class MySide extends Component {
    render() {
        const location = this.props.location
        let path = location.pathname
        if (path === '/admin') {
            path = '/admin/company-profit'
        }
        if (path.startsWith('/admin/user-info-control')) {
            path = '/admin/user-info'
        }
        if (path === '/admin/account') {
            path = '/admin/company-account'
        }
        // console.log(location);
        return (
            <div>
                <div className="site-title">
                    <Link to='/introduction'><img src={logo} style={{float: 'left'}} alt={'三湘银行'}/></Link>
                    <p className="site-title-name">三湘银行后台系统</p>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[path]}>
                    <SubMenu key='sub1' icon={<TeamOutlined/>} title="用户管理">
                        <Menu.Item key="/admin/user" icon={<HomeOutlined/>}>
                            <Link to='/admin/user'>基本信息</Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/user-info' icon={<SearchOutlined/>}>
                            <Link to='/admin/user-info'>
                                成功参与
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/apply' icon={<IdcardOutlined/>}>
                            <Link to='/admin/apply'>申请记录</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub2' icon={<MailOutlined/>} title="产品管理">
                        <Menu.Item key='/admin/product' icon={<PieChartOutlined/>}>
                            <Link to='/admin/product'>
                                秒杀信息
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/product-info' icon={<BarsOutlined/>}>
                            <Link to='/admin/product-info'>
                                产品详情
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/add' icon={<PlusOutlined/>}>
                            <Link to='/admin/add'>
                                详情添加
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub3' icon={<BankOutlined/>} title="公司账户">
                        <Menu.Item key='/admin/company-profit' icon={<LineChartOutlined />}>
                            <Link to='/admin/company-profit'>
                                产品收入
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/company-season' icon={<MoneyCollectOutlined />}>
                            <Link to='/admin/company-season'>
                                季度账单
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/admin/company-account' icon={<HighlightOutlined />}>
                            <Link to='/admin/company-account'>
                                账户明细
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default withRouter(MySide)