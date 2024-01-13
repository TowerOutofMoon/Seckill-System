import React, {Component} from 'react';

import {Form, Input, Button, message} from 'antd';
import withRouter from "../../withRouter";
import {adminLoginReq} from "../../actions/adminAction";
import {connect} from "react-redux";


class AdminLogin extends Component {

    onFinish = (values) => {
        this.props.adminLoginReq(values).then(
            res => {
                console.log('Success:', values);
                this.props.navigate('/introduction')
            },
            error => {
                // message.error('没有找到这个人');
                console.log('error',error);
            }
        )
        // this.props.navigate('/introduction')
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div>
                <Form
                    name="basic"
                    labelCol={{span: 5, offset: 3}}
                    wrapperCol={{span: 8}}
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item>
                        <label className='login-title'>管理员登录</label>
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="adminName"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 11, span: 13}}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(
    null,
    {
        adminLoginReq,
    }
)(withRouter(AdminLogin));