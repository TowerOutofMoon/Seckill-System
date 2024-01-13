import React, {Component} from 'react';
import {Card, Table} from "antd";
import {connect} from "react-redux";
import {getSuccessUserInfoReq} from "../../actions/userControlAction";
import {killSuccessPeopleColumn} from "../../config/column";

class MyUsersInfo extends Component {
    state = {
        users: [
            {
                username: '王帅',
                phoneNumber: '19918704890',
                productName: '东方红',
                money: '15000'
            }
        ]
    }
    columns = killSuccessPeopleColumn

    componentDidMount() {
        this.setState({users: []})
        this.props.getSuccessUserInfoReq().then(
            res => {
                const users = res.data.result
                this.setState({users})
            }
        )
    }

    render() {
        return (
            <Card title={'秒杀人员'}>
                <Table dataSource={this.state.users} columns={this.columns}/>
            </Card>
        );
    }
}

export default connect(
    null,
    {
        getSuccessUserInfoReq
    }
)(MyUsersInfo);