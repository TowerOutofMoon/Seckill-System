import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, InputNumber, message, Row, Select} from "antd";
import {connect} from "react-redux";
import {userInfoAddReq, userInfoGetReq} from "../../actions/userControlAction";
import withRouter from "../../withRouter";
import {IdcardOutlined, TeamOutlined} from "@ant-design/icons";

class MyUsersControl extends Component {
    formRef = React.createRef()

    componentDidMount() {
        const {identityNumber} = this.props.params
        this.props.userInfoGetReq(identityNumber).then(
            res => {
                console.log(res.data);
                const user = res.data.result[0]
                const formNode = this.formRef.current
                formNode.setFieldsValue({username: user.username, identityNumber: user.identityNumber});
            },
            error => {
                console.log(error);
            }
        )
    }

    handleSubmit = (userData) => {
        this.props.userInfoAddReq(userData).then(
            res => {
                message.success('添加成功')
                this.formRef.current.resetFields()
            },
            error => {
                console.log(error);
                message.error('添加失败')
            }
        )
    }

    render() {
        return (
            <Row>
                <Col span={4}/>
                <Col span={16}>
                    <Card title={"初筛设置"} className={"my-user-control-card"}>
                        <Form onFinish={values => this.handleSubmit(values)} ref={this.formRef}>
                            <Form.Item
                                label={"用户名"}
                                name={"username"}
                                wrapperCol={{span: 6}}>
                                <Input disabled={'true'} addonAfter={<IdcardOutlined/>}/>
                            </Form.Item>
                            <Form.Item
                                label={"账户"}
                                name={"identityNumber"}
                                wrapperCol={{span: 7}}
                            >
                                <Input disabled={'true'} addonAfter={<TeamOutlined/>}/>
                            </Form.Item>
                            <Form.Item
                                label={"逾期次数"}
                                name={"overdueTimes"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    {required: true, message: '请输入逾期次数'}
                                ]}
                            >
                                <InputNumber addonAfter="次" step={1} max={10} min={0}/>
                            </Form.Item>
                            <Form.Item
                                label={'逾期时间'}
                                name={"overdueDays"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    {required: true, message: '请输入逾期时间'}
                                ]}
                            >
                                <Input addonAfter={'日'}/>
                            </Form.Item>
                            <Form.Item
                                label={'工作状态'}
                                name={"workingState"}
                                wrapperCol={{span: 6}}
                                rules={[
                                    {required: true}
                                ]}
                            >
                                <Select>
                                    <Select.Option value={'0'}>在职</Select.Option>
                                    <Select.Option value={'1'}>退休</Select.Option>
                                    <Select.Option value={'2'}>肄业</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={'是否贷款'}
                                name={"isBorrow"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    {required: true}
                                ]}
                            >
                                <Select>
                                    <Select.Option value={'1'}>是</Select.Option>
                                    <Select.Option value={'0'}>否</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={'是否定期存款'}
                                name={"isStore"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    {required: true}
                                ]}
                            >
                                <Select>
                                    <Select.Option value={'1'}>是</Select.Option>
                                    <Select.Option value={'0'}>否</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 11}}>
                                <Button type={"primary"} htmlType={"submit"}>提交</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={4}/>
            </Row>
        );
    }
}

export default connect(
    null,
    {
        userInfoAddReq,
        userInfoGetReq
    }
)(withRouter(MyUsersControl));