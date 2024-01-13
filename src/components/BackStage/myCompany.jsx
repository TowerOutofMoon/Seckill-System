import React, {Component} from 'react';
import {Card, Divider} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import * as echarts from "echarts";

class MyCompany extends Component {
    state = {
        money: 0
    }

    componentDidMount() {
        axios.get('/kill/admin/info').then(
            (res) => {
                console.log(res);
                const money = res.data.result.companyMoney
                this.setState({money});
            },
            error => {
                console.log(error);
            }
        )
    }


    render() {
        return (
            <Card title={'账户总览'} className={'company-card'}>
                <div className={'company-account'} >
                    <p>公司账户总额为:&nbsp;&nbsp;<span className={'money'}>{this.state.money}元</span></p>
                    <Divider />
                    <p>公司昨日收益:<span className={'money'}>&nbsp;&nbsp;120,000元</span></p>
                    <Divider />
                    <p>单日销售额增长量:<span className={'money'} style={{color: 'green'}}>&nbsp;&nbsp;-3.7%</span></p>
                    <Divider />
                    <Link to={'/admin/account'} style={{float: 'right', color: '#0C7E40', marginBottom: '20px'}}>查看明细</Link>
                    <Divider />
                </div>
            </Card>
        );
    }
}

export default MyCompany;