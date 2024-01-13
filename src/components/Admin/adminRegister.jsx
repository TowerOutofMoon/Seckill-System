import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Form,
    Input,
    Button, message,
} from 'antd';
import {adminRegisterReq} from "../../actions/adminAction";
import withRouter from "../../withRouter";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
};



class AdminRegister extends Component {

    onFinish = (values) => {
        this.props.adminRegisterReq(values).then(
            (res) => {
                console.log(res);
                if (res.data){
                    message.success('注册成功')
                }else {
                    message.error('注册失败')
                }
            },
            (error) => {
                console.log(error);
            }
        )

        this.props.navigate('/admin-use/admin-login')
        // console.log('Received values of form: ', values);
    };

    render() {
        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item>
                    <label className='register-title'>管理员注册</label>
                </Form.Item>

                <Form.Item
                    label="用户名"
                    name="adminName"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 2, max: 15, message: '用户名长度为2-15位' },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="工号"
                    name="accountNumber"
                    rules={[{ required: true, message: '请输入工号' }]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="电话"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: '请输入电话号码' },
                        {
                            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                            message: '电话号码不存在'
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="身份证"
                    name="identityNumber"
                    rules={[
                        { required: true, message: '请输入身份证' },
                        {
                            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                            message: '身份证号不存在'
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码输入不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default connect(
    null,
    {
        adminRegisterReq
    }
)(withRouter(AdminRegister))