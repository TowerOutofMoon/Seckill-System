import {Menu} from "antd";
import {
    BankOutlined, BarsOutlined, HighlightOutlined,
    HomeOutlined,
    IdcardOutlined, LineChartOutlined,
    MailOutlined, MoneyCollectOutlined,
    PieChartOutlined, PlusOutlined,
    SearchOutlined,
    SmileOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";

const {SubMenu} = Menu

export const topMenu = (
    <Menu>
        <SubMenu key={'sub1'} title={"用户管理"} icon={<SmileOutlined/>}>
            <Menu.Item key='1' icon={<HomeOutlined />}>
                <Link to='/admin/user'>
                    基本信息
                </Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<SearchOutlined/>}>
                <Link to='/admin/user-info'>
                    成功参与
                </Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<IdcardOutlined />}>
                <Link to='/admin/apply'>
                    申请记录
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key={'sub2'} icon={<MailOutlined/>} title="产品管理">
            <Menu.Item key='4' icon={<PieChartOutlined/>}>
                <Link to='/admin/product'>
                    秒杀信息
                </Link>
            </Menu.Item>
            <Menu.Item key='5' icon={<BarsOutlined/>}>
                <Link to='/admin/product-info'>
                    产品详情
                </Link>
            </Menu.Item>
            <Menu.Item key='6' icon={<PlusOutlined/>}>
                <Link to='/admin/add'>
                    详情添加
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key={'sub3'} icon={<BankOutlined/>} title="公司账户">
            <Menu.Item key='7' icon={<LineChartOutlined />}>
                <Link to='/admin/company-profit'>
                    产品收入
                </Link>
            </Menu.Item>
            <Menu.Item key='8' icon={<MoneyCollectOutlined />}>
                <Link to='/admin/company-season'>
                    季度账单
                </Link>
            </Menu.Item>
            <Menu.Item key='9' icon={<HighlightOutlined />}>
                <Link to='/admin/company-account'>
                    账户明细
                </Link>
            </Menu.Item>
        </SubMenu>

    </Menu>
)