import React, {Component} from 'react';
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Select} from "antd";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from "moment";
import {connect} from "react-redux";
import {productInfoAddReq} from "../../actions/productControlAction";
import {viewProductReq} from "../../actions/killAction";

class MyAdd extends Component {

    state = {
        products: []
    }

    formRef = React.createRef()

    handleSubmit = (productData) => {
        console.log(this.formRef);
        const {
            productReleaseStartDay, productReleaseEndDay, productHarvestDay, productExpireDay,
        } = productData
        //日期格式化
        productData.productReleaseStartDay = moment(productReleaseStartDay).format('YYYY-MM-DD')
        productData.productReleaseEndDay = moment(productReleaseEndDay).format('YYYY-MM-DD')
        productData.productHarvestDay = moment(productHarvestDay).format('YYYY-MM-DD')
        productData.productExpireDay = moment(productExpireDay).format('YYYY-MM-DD')
        // console.log(productData);
        //数据交给后端
        this.props.productInfoAddReq(productData).then(
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

    componentDidMount() {
        this.props.viewProductReq().then(
            res => {
                const products = res.data.result
                this.setState({products})
            }
        )
    }

    render() {
        return (
            <Row>
                <Col span={4}/>
                <Col span={16}>
                    <Card title={"产品信息添加"} className={"my-add-card"}>
                        <Form onFinish={values => this.handleSubmit(values)} ref={this.formRef} initialValues={{
                            productRate: 1.0,
                            productPeriod: 10,
                            productScale: 100
                        }}>
                            <Form.Item
                                label={"产品名称"}
                                name={"seckillProductName"}
                                wrapperCol={{span: 6}}
                                rules={[
                                    { message: '请输入产品名称'}
                                ]}>
                                <Select>
                                    {
                                        this.state.products ?
                                            this.state.products.map((productObj) => {
                                                return <Select.Option
                                                    value={productObj.seckillProductName}>{productObj.seckillProductName}</Select.Option>
                                            }) : null
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={"产品利率"}
                                name={"productRate"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    { message: '请输入利率'}
                                ]}
                            >
                                <InputNumber addonAfter="%" step={0.1} max={20.0} min={0}/>
                            </Form.Item>
                            <Form.Item
                                label={"产品期限"}
                                name={"productPeriod"}
                                wrapperCol={{span: 3}}
                                rules={[
                                    { message: '请输入产品期限'}
                                ]}
                            >
                                <InputNumber addonAfter="月" step={1} max={60} min={0}/>
                            </Form.Item>
                            <Form.Item
                                className={'release'}
                                label={'发行日期'}
                                style={{display: 'inline-block'}}
                                name={"productReleaseStartDay"}
                                rules={[
                                    { message: '请输入开始日期'}
                                ]}
                            >
                                <DatePicker locale={locale}/>
                            </Form.Item>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '24px',
                                    lineHeight: '32px',
                                    textAlign: 'center'
                                }}
                            >
                                -
                                </span>
                            <Form.Item
                                style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                                name={"productReleaseEndDay"}
                                rules={[
                                    { message: '请输入结束日期'}
                                ]}
                            >
                                <DatePicker locale={locale}/>
                            </Form.Item>
                            <Form.Item
                                label={"起息日"}
                                name={"productHarvestDay"}
                                rules={[
                                    { message: '请输入起息日'}
                                ]}
                            >
                                <DatePicker locale={locale}/>
                            </Form.Item>
                            <Form.Item
                                label={"到期日"}
                                name={"productExpireDay"}
                                rules={[
                                    { message: '请输入到期日'}
                                ]}
                            >
                                <DatePicker locale={locale}/>
                            </Form.Item>
                            <Form.Item
                                label={"发行规模"}
                                name={"productScale"}
                                wrapperCol={{span: 4}}
                                rules={[
                                    { message: '请输入发行规模'}
                                ]}
                            >
                                <InputNumber step={10} min={0} addonAfter={"万"}/>
                            </Form.Item>
                            <Form.Item
                                label={"产品代码"}
                                name={"productCode"}
                                wrapperCol={{span: 6}}
                                rules={[
                                    { message: '请输入产品代码'}
                                ]}
                            >
                                <Input addonAfter={"English"}/>
                            </Form.Item>
                            <Form.Item
                                label={"产品说明"}
                                name={"productAddition"}
                                rules={[
                                    { message: '请输入产品说明'}
                                ]}
                            >
                                <Input.TextArea autoSize={{minRows: 6}}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 12}}>
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
        productInfoAddReq,
        viewProductReq
    }
)(MyAdd);