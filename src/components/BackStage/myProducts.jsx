import React, {Component} from 'react'
import {Card, Button, Table, Modal, Form, Input, message, DatePicker, TimePicker, Select, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import {
    storeProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    addProductReq,
    deleteProductReq,
    updateProductReq
} from '../../actions/adminAction';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {findIndex} from "lodash";

const Item = Form.Item
const {Option} = Select;

function PickerWithType({type, onChange}) {
    if (type === 'time') return <TimePicker onChange={onChange}/>;
    if (type === 'date') return <DatePicker onChange={onChange}/>;
    return <DatePicker picker={type} onChange={onChange}/>;
}

class MyProducts extends Component {

    state = {
        // products: [
        //     {
        //         key: '1',
        //         seckillProductName: '一号产品',
        //         seckillProductPrice: '100',
        //         seckillProductAmount: '100',
        //         seckillTime: '2022-04-01 22:30:00',
        //         seckillEnd: '2022-04-01 24:00:00'
        //     },
        //     {
        //         key: '2',
        //         seckillProductName: '二号产品',
        //         seckillProductPrice: '200',
        //         seckillProductAmount: '200',
        //         seckillTime: '2022-04-01 21:30:00',
        //         seckillEnd: '2022-04-01 23:00:00'
        //     },
        //     {
        //         key: '3',
        //         seckillProductName: '三号产品',
        //         seckillProductPrice: '300',
        //         seckillProductAmount: '300',
        //         seckillTime: '2022-04-01 20:30:00',
        //         seckillEnd: '2022-04-01 21:00:00'
        //     },
        //     {
        //         key: '4',
        //         seckillProductName: '四号产品',
        //         seckillProductPrice: '400',
        //         seckillProductAmount: '400',
        //         seckillTime: '2022-04-01 19:30:00',
        //         seckillEnd: '2022-04-01 20:00:00'
        //     },
        //     {
        //         key: '5',
        //         seckillProductName: '五号产品',
        //         seckillProductPrice: '500',
        //         seckillProductAmount: '500',
        //         seckillTime: '2022-04-01 18:30:00',
        //         seckillEnd: '2022-04-01 19:00:00'
        //     }
        // ],
        products: [],
        // displayProducts: [
        //     {
        //         key: '1',
        //         seckillProductName: '一号产品',
        //         seckillProductPrice: '100',
        //         seckillProductAmount: '100',
        //         seckillTime: '2022-04-01 22:30:00',
        //         seckillEnd: '2022-04-01 24:00:00'
        //     },
        //     {
        //         key: '2',
        //         seckillProductName: '二号产品',
        //         seckillProductPrice: '200',
        //         seckillProductAmount: '200',
        //         seckillTime: '2022-04-01 21:30:00',
        //         seckillEnd: '2022-04-01 23:00:00'
        //     },
        //     {
        //         key: '3',
        //         seckillProductName: '三号产品',
        //         seckillProductPrice: '300',
        //         seckillProductAmount: '300',
        //         seckillTime: '2022-04-01 20:30:00',
        //         seckillEnd: '2022-04-01 21:00:00'
        //     },
        //     {
        //         key: '4',
        //         seckillProductName: '四号产品',
        //         seckillProductPrice: '400',
        //         seckillProductAmount: '400',
        //         seckillTime: '2022-04-01 19:30:00',
        //         seckillEnd: '2022-04-01 20:00:00'
        //     },
        //     {
        //         key: '5',
        //         seckillProductName: '五号产品',
        //         seckillProductPrice: '500',
        //         seckillProductAmount: '500',
        //         seckillTime: '2022-04-01 18:30:00',
        //         seckillEnd: '2022-04-01 19:00:00'
        //     }],
        displayProducts:[],
        isLoading: false,
        isAddModalVisible: false,
        isUpdateModalVisible: false,
        pickerType: 'Date',//记录选定的Picker种类
        seckillTime: "",
        seckillEnd: "",
        record: {}, //存储某一行的数据
    }

    addFormRef = React.createRef()
    updateFormRef = React.createRef()

    initColumns = () => {
        this.columns = [
            {title: '产品名称', dataIndex: 'seckillProductName', key: 'seckillProductName'},
            {title: '秒杀价', dataIndex: 'seckillProductPrice', key: 'seckillProductPrice'},
            {title: '库存', dataIndex: 'seckillProductAmount', key: 'seckillProductAmount'},
            {title: '开始时间', dataIndex: 'seckillTime', key: 'seckillTime'},
            {title: '结束时间', dataIndex: 'seckillEnd', key: 'seckillEnd'},
            {
                title: '操作', dataIndex: 'action', key: 'action', align: 'center', render: (text, record) => (
                    <span>
                        <Button onClick={() => (this.deleteProduct(record))} type="link">删除商品</Button>
                        <Button onClick={() => (this.showUpdateModal(record))} type="link">修改商品</Button>
                    </span>
                )
            }
        ];
    }

    storeProducts = () => {
        const {storeProducts} = this.props
        this.setState({displayProducts:[]})
        let myProducts = []
        axios.get('/kill/seckillProduct/getSecKillProducts').then(
            res => {
                this.setState({isLoading: true})
                myProducts = res.data.result
                console.log(myProducts);
                myProducts.map((productObj) => {
                    productObj.key = productObj.seckillProductId
                    productObj.seckillTime = moment(productObj.seckillTime).format('YYYY-MM-DD HH:mm:ss')
                    productObj.seckillEnd = moment(productObj.seckillEnd).format('YYYY-MM-DD HH:mm:ss')
                })
                // storeProducts(myProducts)
                // const products = this.props.products
                this.setState({isLoading: false, products: myProducts, displayProducts: myProducts})
            },
            error => {
                console.log(error);
            }
        )

    }

    deleteProduct = (record) => {
        console.log(record);
        //1.获取到该行数据的key
        const seckillProductId = record.seckillProductId
        const key = record.key
        const {deleteProduct, deleteProductReq} = this.props
        const {products, displayProducts} = this.state
        //2.更新数据库
        deleteProductReq({seckillProductId}).then(
            res => {
                console.log(res);
                //3.执行删除操作
                deleteProduct(seckillProductId)
                //4.更新状态
                const index = findIndex(displayProducts, {key})
                if (index >= 0) {
                    console.log(index);
                    const newProducts = [...displayProducts.slice(0, index), ...displayProducts.slice(index + 1)]
                    this.setState({displayProducts: newProducts})
                }
            },
            error => {
                console.log(error);
            }
        )

        // const index = findIndex(displayProducts, {key})
        // if (index >= 0) {
        //     console.log(index);
        //     const newProducts = [...displayProducts.slice(0, index), ...displayProducts.slice(index + 1)]
        //     this.setState({displayProducts: newProducts})
        // }

    }

    /**
     * 操控addForm的方法
     */
    showAddModal = () => {
        this.setState({isAddModalVisible: true})
    }

    handleAddOk = () => {
        const {addProductReq, addProduct} = this.props
        const {seckillTime, seckillEnd} = this.state
        this.setState({
            isAddModalVisible: false
        })
        const currNode = this.addFormRef.current
        //1.获取到表单数据
        const displayProducts = currNode.getFieldsValue()
        displayProducts.seckillTime = seckillTime
        displayProducts.seckillEnd = seckillEnd
        displayProducts.key = this.state.products.length + 1
        // console.log('displayProducts@',displayProducts);
        //2.更新数据库
        addProductReq(displayProducts).then(
            res => {
                // console.log(res);
                if (res.data.code === "500") {
                    message.error("添加失败!")
                } else {
                    //3.执行addProduct,将product放到redux中
                    addProduct(displayProducts)
                    //4.更新状态
                    this.setState({displayProducts: [...this.state.displayProducts, displayProducts]})
                }
            },
            error => {
                console.log(error);
            }
        )
        // addProduct(displayProducts)
        // this.setState({displayProducts: [...this.state.displayProducts, displayProducts]})
    }

    handleAddCancel = () => {
        this.setState({isAddModalVisible: false})
    }

    /**
     * 操控updateForm的方法
     */
    showUpdateModal = (record) => {
        // console.log(record);
        // 展示并更新
        this.setState({
            record,
            isUpdateModalVisible: true
        })
    }

    handleUpdateOk = () => {
        //设置页面为可见
        this.setState({
            isUpdateModalVisible: false,
            seckillTime: "",
            seckillEnd: ""
        })

        //获取新输入的数据
        const currNode = this.updateFormRef.current
        const productData = currNode.getFieldsValue()

        const {record, products, displayProducts, seckillTime, seckillEnd} = this.state
        console.log('@product', productData);
        console.log('@record', record);
        console.log('@seckillTime',seckillTime);
        console.log('@seckillEnd',seckillEnd);

        //如果没有更新对应数据的话，沿用之前的数据
        if (!productData.seckillProductName) {
            productData.seckillProductName = record.seckillProductName
        }
        if (!productData.seckillProductPrice) {
            productData.seckillProductPrice = record.seckillProductPrice
        }
        if (!productData.seckillProductAmount) {
            productData.seckillProductAmount = record.seckillProductAmount
        }
        if (!seckillTime) {
            productData.seckillTime = record.seckillTime
        } else {
            productData.seckillTime = moment(seckillTime).format('YYYY-MM-DD HH:mm:ss')
        }
        if (!seckillEnd) {
            productData.seckillEnd = record.seckillEnd
        } else {
            productData.seckillEnd = moment(seckillEnd).format('YYYY-MM-DD HH:mm:ss')
        }
        productData.key = record.key
        productData.seckillProductId = record.key

        console.log(productData);

        //更改数据库
        this.props.updateProductReq(productData).then(
            res => {
                console.log(res);
                //执行更新操作
                this.props.updateProduct(productData)
                //更新状态
                const i = findIndex(products, {key: record.key})//可能是seckillProductId
                const displayProducts = [...this.state.displayProducts.slice(0, i), productData, ...this.state.displayProducts.slice(i + 1)]
                console.log('new@',displayProducts);
                this.setState({displayProducts})
            }
        )
        // const i = findIndex(products, {key: record.key})
        // const newDisplayProducts = [...displayProducts.slice(0, i), productData, ...displayProducts.slice(i + 1)]
        // this.setState({displayProducts:newDisplayProducts})
    }

    handleUpdateCancel = () => {
        this.setState({isUpdateModalVisible: false})
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
        this.storeProducts()
    }


    render() {
        const {displayProducts} = this.state
        const {record, pickerType} = this.state
        // console.log(this.state.seckillTime)
        return (
            <Card title="秒杀信息" extra={<Button type="primary" onClick={this.showAddModal}><PlusOutlined/>添加</Button>}
                  style={{width: '100%'}}>
                <Table
                    dataSource={displayProducts}
                    columns={this.columns}
                    pagination={{defaultPageSize: 4}}
                    bordered
                    loading={this.state.isLoading}/>
                <Modal
                    title="添加商品"
                    visible={this.state.isAddModalVisible}
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}>
                    <Form
                        ref={this.addFormRef}
                        labelCol={{span: 4}}
                    >
                        <Item
                            name="seckillProductName"
                            label="名称"
                        >
                            <Input placeholder='名称'/>
                        </Item>
                        <Item
                            name="seckillProductPrice"
                            label="秒杀价"
                        >
                            <Input placeholder='秒杀价'/>
                        </Item>
                        <Item
                            name="seckillProductAmount"
                            label="库存"
                        >
                            <Input placeholder='库存'/>
                        </Item>
                        <Item
                            label="开始时间"
                        >
                            <Space>
                                <Select value={pickerType} onChange={(type) => {
                                    console.log(type);
                                    this.setState({pickerType: type})
                                }}>
                                    <Option value="date">Date</Option>
                                    <Option value="time">Time</Option>
                                    <Option value="week">Week</Option>
                                    <Option value="month">Month</Option>
                                    <Option value="quarter">Quarter</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <PickerWithType type={pickerType} onChange={value => {
                                    if (value) {
                                        // console.log(123);
                                        this.setState({seckillTime: moment(value).format('YYYY-MM-DD')})
                                    }
                                }}/>
                                <TimePicker onChange={value => {
                                    const time = moment(value).format('HH:mm:ss')
                                    this.setState({seckillTime: this.state.seckillTime + ' ' + time})
                                }}/>
                            </Space>
                        </Item>
                        <Item
                            label="结束时间"
                        >
                            <Space>
                                <Select value={pickerType} onChange={(type) => {
                                    console.log(type);
                                    this.setState({pickerType: type})
                                }}>
                                    <Option value="date">Date</Option>
                                    <Option value="time">Time</Option>
                                    <Option value="week">Week</Option>
                                    <Option value="month">Month</Option>
                                    <Option value="quarter">Quarter</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <PickerWithType type={pickerType} onChange={value => {
                                    if (value) {
                                        // console.log(123);
                                        this.setState({seckillEnd: moment(value).format('YYYY-MM-DD')})
                                    }
                                }}/>
                                <TimePicker onChange={value => {
                                    const time = moment(value).format('HH:mm:ss')
                                    this.setState({seckillEnd: this.state.seckillEnd + ' ' + time})
                                }}/>
                            </Space>
                        </Item>
                    </Form>
                </Modal>
                <Modal
                    title="更改商品信息"
                    visible={this.state.isUpdateModalVisible}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleUpdateCancel}>
                    <Form ref={this.updateFormRef}>
                        <Item
                            name="seckillProductName"
                            label="名称"
                        >
                            <Input placeholder={record.seckillProductName}/>
                        </Item>
                        <Item
                            name="seckillProductPrice"
                            label="秒杀价"
                        >
                            <Input placeholder={record.seckillProductPrice}/>
                        </Item>
                        <Item
                            name="seckillProductAmount"
                            label="库存"
                        >
                            <Input placeholder={record.seckillProductAmount}/>
                        </Item>
                        <Item
                            label="开始时间"
                        >
                            <Space>
                                <Select value={pickerType} onChange={(type) => {
                                    console.log(type);
                                    this.setState({pickerType: type})
                                }}>
                                    <Option value="date">Date</Option>
                                    <Option value="time">Time</Option>
                                    <Option value="week">Week</Option>
                                    <Option value="month">Month</Option>
                                    <Option value="quarter">Quarter</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <PickerWithType type={pickerType} onChange={value => {
                                    if (value) {
                                        // console.log(123);
                                        this.setState({seckillTime: moment(value).format('YYYY-MM-DD')})
                                    }
                                }}/>
                                <TimePicker onChange={value => {
                                    const time = moment(value).format('HH:mm:ss')
                                    this.setState({seckillTime: this.state.seckillTime + ' ' + time})
                                }}/>
                            </Space>
                        </Item>
                        <Item
                            label="结束时间"
                        >
                            <Space>
                                <Select value={pickerType} onChange={(type) => {
                                    console.log(type);
                                    this.setState({pickerType: type})
                                }}>
                                    <Option value="date">Date</Option>
                                    <Option value="time">Time</Option>
                                    <Option value="week">Week</Option>
                                    <Option value="month">Month</Option>
                                    <Option value="quarter">Quarter</Option>
                                    <Option value="year">Year</Option>
                                </Select>
                                <PickerWithType type={pickerType} onChange={value => {
                                    if (value) {
                                        console.log(123);
                                        this.setState({seckillEnd: moment(value).format('YYYY-MM-DD')})
                                    }
                                }}/>
                                <TimePicker onChange={value => {
                                    const time = moment(value).format('HH:mm:ss')
                                    this.setState({seckillEnd: this.state.seckillEnd + ' ' + time})
                                }}/>
                            </Space>
                        </Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state => ({products: state.products}),
    {
        storeProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        addProductReq,
        deleteProductReq,
        updateProductReq,
    }
)(MyProducts)