import React, {Component} from 'react'
import {connect} from 'react-redux';
import {debounce} from '../../utils/limitUtils/debounce';


import {getPurchaseLink, postOrder, viewProductReq} from "../../actions/killAction";

import SecondKill from '../SecondKill/secondkill';


import './productSale.css'

import {
    Table,
    Button,
    Card,
    Modal,
    Form,
    InputNumber,
    message,
    Popconfirm,
    Row,
    Col,
    Divider,
    List,
    Typography, Input
} from 'antd';
import {ShoppingOutlined} from '@ant-design/icons';

import top_banner from '../images/top-image.png'
import {Link} from "react-router-dom";
import withRouter from "../../withRouter";

/*说明:
1.state提供了默认值
2.在前端测试的时候,为了展示所有Modal,更改了未开始按钮的展示Modal,发布的时候需要改回来*/
const Item = Form.Item
const data = [
    ['产品购买', '可购买', '未开始', '已结束'],
    ['产品名称', '不限', '产品名称']
];

class ProductSale extends Component {

    state = {
        products: [
            {
                key: '1',
                seckillProductName: '可购买商品',
                seckillProductPrice: 22,
                seckillProductAmount: 15,
                seckillTime: '2022-03-08 11:30:00',
                seckillEnd: '2022-03-08 12:30:00',
                isSale: 1,//正在发售
            },
            {
                key: '2',
                seckillProductName: '未开始商品1',
                seckillProductPrice: 12,
                seckillProductAmount: 52,
                seckillTime: '2022-05-01 12:00:00',
                seckillEnd: '2022-05-01 12:30:00',
                isSale: 0,//未开始
            },
            {
                key: '3',
                seckillProductName: '已结束商品',
                seckillProductPrice: 32,
                seckillProductAmount: 59,
                seckillTime: '2022-06-18 20:40:00',
                seckillEnd: '2022-06-18 21:00:00',
                isSale: -1,//已结束
            },
            {
                key: '4',
                seckillProductName: '未开始商品2',
                seckillProductPrice: 64,
                seckillProductAmount: 7,
                seckillTime: '2022-08-05 23:00:00',
                seckillEnd: '2022-08-05 24:00:00',
                isSale: 0,//未开始
            },
            {
                key: '5',
                seckillProductName: '未开始商品3',
                seckillProductPrice: 100,
                seckillProductAmount: 7,
                seckillTime: '2022-04-07 21:00:00',
                seckillEnd: '2022-04-07 22:00:00',
                isSale: 0,//未开始
            }
        ],//所有的产品
        displayedProducts: [
            {
                key: '1',
                seckillProductName: '可购买商品',
                seckillProductPrice: 22,
                seckillProductAmount: 15,
                seckillTime: '2022-03-08 11:30:00',
                seckillEnd: '2022-03-08 12:30:00',
                isSale: 1,//正在发售
            },
            {
                key: '2',
                seckillProductName: '未开始商品1',
                seckillProductPrice: 12,
                seckillProductAmount: 52,
                seckillTime: '2022-05-01 12:00:00',
                seckillEnd: '2022-05-01 12:30:00',
                isSale: 0,//结束发售
            },
            {
                key: '3',
                seckillProductName: '已结束商品',
                seckillProductPrice: 32,
                seckillProductAmount: 59,
                seckillTime: '2022-06-18 20:40:00',
                seckillEnd: '2022-06-18 21:00:00',
                isSale: -1,//已结束
            },
            {
                key: '4',
                seckillProductName: '未开始商品2',
                seckillProductPrice: 64,
                seckillProductAmount: 7,
                seckillTime: '2022-08-05 23:00:00',
                seckillEnd: '2022-08-05 24:00:00',
                isSale: 0,//正在发售
            },
            {
                key: '5',
                seckillProductName: '未开始商品3',
                seckillProductPrice: 100,
                seckillProductAmount: 7,
                seckillTime: '2022-04-07 21:00:00',
                seckillEnd: '2022-04-07 22:00:00',
                isSale: 0,//未开始
            },
        ],//展示的产品
        seckillTime: new Date(),//动态生成获取活动开始时间
        seckillEnd: new Date(),//动态生成获取活动结束时间
        record: {}, //存储某一行的数据
        isLoading: false,//初始化数据是否等待
        isWaitModalVisible: false, //等待界面是否可见
        isEndModalVisible: false, //结束界面是否可见
        isTipModalVisible: false, //提示界面是否可见
        visible: false, // 支付界面是否可见
        killLink: '', // 秒杀链接
        payMoney: 0, //应支付的金额
    }

    formRef = React.createRef()

    //初始化列表
    initColumns = () => {
        this.columns = [
            {title: '产品名称', dataIndex: 'seckillProductName', key: 'seckillProductName', className: 'first-left'},
            {title: '秒杀价', dataIndex: 'seckillProductPrice', key: 'seckillProductPrice', width: 10},
            {title: '库存', dataIndex: 'seckillProductAmount', key: 'seckillProductAmount', width: 10},
            {title: '秒杀开始时间', dataIndex: 'seckillTime', key: 'seckillTime', width: 150},
            {title: '秒杀结束时间', dataIndex: 'seckillEnd', key: 'seckillEnd', width: 150},
            // {
            //   title: '图片', dataIndex: 'seckillProductImages', align: 'center', render: (text, record) => (
            //     <img src={record.image} alt="手机" />
            //   )
            // },
            {
                title: '购买', dataIndex: '', width: 20, render: (text, record) => (
                    <Button onClick={() => {
                        // console.log(record);
                        const {isSale} = record
                        const {getPurchaseLink, navigate} = this.props
                        // 先判断是否过初筛

                        // 根据isSale判断
                        if (isSale === 1) {
                            // 如果可以购买,弹出提示窗口
                            this.setState({isTipModalVisible: true})
                            setTimeout(() => {
                                this.setState({isTipModalVisible: false})
                                // 获取动态链接
                                getPurchaseLink(record.seckillProductId).then(
                                    res => {
                                        this.setState({
                                            killLink: res.data.result
                                            // killLink:'12345678'
                                        })
                                        this.purchaseProduct(record)
                                    },
                                    error => {
                                        console.log(error);
                                        message.error('购买页面出现问题了...')
                                    }
                                )
                            }, 3000)
                        } else if (isSale === 0) {
                            this.showWaitModal(record)
                        } else {
                            this.showEndModal()
                            // this.showWaitModal()
                            // this.purchaseProduct(record)
                        }
                    }
                    }
                            type="primary"
                            disabled={record.isSale === -1}
                    >{record.isSale === 1 ? '可购买' : record.isSale === 0 ? '未开始' : '已结束'}</Button>
                )
            },
            {
                title: '详情信息',
                dataIndex: '',
                align: 'center',
                //传递产品ID
                render: (text, record) => <Link
                    to={`/product-intro/${record.seckillProductName}`}>{record.seckillProductName}</Link>
            }
        ]
    }

    //初始化
    UNSAFE_componentWillMount() {
        this.initColumns()
        this.viewProduct()
    }

    //产品展示
    viewProduct = () => {
        // console.log(this.props);
        this.props.viewProductReq().then(
            (res) => {
                this.setState({isLoading: true})
                const products = res.data.result
                let currTime = new Date()
                // console.log(products);
                for (let i = 0; i < products.length; i++) {
                    //获取开始时间
                    let seckillTime = products[i].seckillTime
                    //获取结束时间
                    let seckillEnd = products[i].seckillEnd
                    //获取商品信息
                    products[i].key = products[i].seckillProductId
                    products[i].seckillEnd = new Date(products[i].seckillEnd).toLocaleString()
                    products[i].seckillTime = new Date(products[i].seckillTime).toLocaleString()
                    //根据时间设置可购买状态:0为还未开始,-1为已经结束,1为可以购买
                    if (currTime <= seckillTime) products[i].isSale = 0
                    else if (currTime >= seckillEnd) products[i].isSale = -1
                    else products[i].isSale = 1
                    //渲染时数据库提供图片地址
                    // products[i].image = '图片'
                }
                console.log(products);
                this.setState({products, displayedProducts: products})
                this.setState({isLoading: false})
            },
            error => {
                console.log(error);
            }
        )
    }

    //产品数量减少
    setProduct = (order) => {
        const {products} = this.props
        for (let i = 0; i < products.length; i++) {
            if (products[i].seckillProductId === order.seckillProductId) {
                products[i].seckillProductAmount = products[i].seckillProductAmount - order.seckillProductAmount
                break;
            }
        }
    }

    //操作payModal的方法
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    //取消购买
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    //进入购买页面，传递对应商品信息
    purchaseProduct = (record) => {
        console.log('购买');
        this.setState({record})
        this.showModal();
    }

    //操作waitModal的方法
    showWaitModal = (record) => {
        this.setState({isWaitModalVisible: true})
        // console.log(record);
        this.setState({seckillTime: record.seckillTime, seckillEnd: record.seckillEnd})
    };

    handleWaitCancel = () => {
        this.setState({isWaitModalVisible: false})
    }


    //操作endModal的方法
    showEndModal = () => {
        this.setState({
            isEndModalVisible: true
        })
    }

    handleEndCancel = () => {
        this.setState({isEndModalVisible: false})
    }

    //操作气泡框的方法
    confirm = () => {
        const currNode = this.formRef.current
        // 验证表单信息
        currNode.validateFields().then(
            (order) => {
                order.id = this.state.record.seckillProductId
                // console.log(this.state.record);
                console.log(order);
                // 操作数据库
                this.props.postOrder(order.id, this.state.killLink).then(
                    res => {
                        const {code, msg} = res.data
                        //根据不同的情况提示对应信息
                        if (code === '500109') {
                            message.warning(msg);
                        } else if (code === '500101') {
                            message.warning(msg);
                        } else if (code === '500102') {
                            message.warning(msg);
                        } else if (code === '500103') {
                            message.warning(msg);
                        } else if (code === '500104') {
                            message.warning(msg)
                        } else if (code === '500105') {
                            message.warning(msg)
                        } else if (code === '200010') {
                            message.success(msg);
                            // 操作redux
                            this.setProduct(order)
                        }
                    },
                    error => {
                        console.log(error);
                        message.warning('发生了一个意料之外的错误')
                    }
                )
                this.setState({
                    visible: false,
                });
            },
            (error) => {
                console.log(error);
                this.setState({
                    visible: true,
                });
            }
        )
        // 购买完毕之后执行储存动作,储存信息包含用户名和产品id.
        // 状态改变后,该用户将无法购买此产品
        // console.log(order);

    }

    cancel = () => {
        message.success('取消成功');
        this.setState({
            visible: false,
        });
    }

    //操作产品选择
    selectProduct = (event) => {
        const text = event.target.innerText
        const {products} = this.state
        let tempProducts = []
        switch (text) {
            case '可购买':
                console.log('可购买');
                products.map((productObj) => {
                    if (productObj.isSale === 1) {
                        tempProducts = [...tempProducts, productObj]
                    }
                })
                this.setState({displayedProducts: tempProducts})
                tempProducts = []
                break;
            case '未开始':
                console.log('未开始');
                products.map((productObj) => {
                    if (productObj.isSale === 0) {
                        tempProducts = [...tempProducts, productObj]
                    }
                })
                this.setState({displayedProducts: tempProducts})
                tempProducts = []
                break;
            case '已结束':
                console.log('已结束');
                products.map((productObj) => {
                    if (productObj.isSale === -1) {
                        tempProducts = [...tempProducts, productObj]
                    }
                })
                this.setState({displayedProducts: tempProducts})
                tempProducts = []
                break;
            case '不 限':
                this.setState({displayedProducts: [...products]})
                break;
            default:
                console.log('@@@@');
        }
    }
    //搜索产品选择
    searchProduct = (value) => {
        const {products} = this.state
        let tempProduct = []
        products.map((productObj) => {
            if (productObj.seckillProductName.startsWith(value)) {
                tempProduct = [...tempProduct, productObj]
            }
        })
        this.setState({displayedProducts: tempProduct})
        tempProduct = []
    }

    render() {
        const {payMoney, record, displayedProducts} = this.state
        // console.log(displayedProducts);
        return <div style={{minHeight: '500px'}}>
            <img src={top_banner} alt=""/>
            <Divider orientation="left" style={{marginLeft: '-65px', color: '#0987cc'}}>产品筛选</Divider>
            <List
                header={<div>所选条件</div>}
                bordered
                dataSource={data}
                renderItem={items => (
                    <List.Item>
                        <Typography.Text strong
                                         style={{marginRight: '20px'}}>{items[0]}</Typography.Text> {items.map((item, key) => {
                        if (key === 0) return null;
                        if (item === '产品名称') return (
                            <Input.Search size={"small"} allowClear style={{width: '20%'}} defaultValue={item}
                                          onSearch={(value) => this.searchProduct(value)}/>)
                        return (
                            <Button size={"small"} className="option-item" onClick={this.selectProduct}>{item}</Button>)
                    })}
                    </List.Item>
                )}
            />
            <Card title={<Divider orientation="left" style={{marginLeft: '-85px', color: '#0987cc'}}>产品秒杀</Divider>}>
                <Row>
                    <Col span={2}/>
                    <Col span={20} className={"product-sale-table"}>
                        <Table columns={this.columns} dataSource={displayedProducts}
                               pagination={{defaultPageSize: 5, showQuickJumper: true}} loading={this.state.isLoading}
                               size={"middle"}/>
                    </Col>
                    <Col span={2}/>
                </Row>
                <Modal
                    title="购买信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    destroyOnClose='true'
                    footer={
                        <span>
                              <Popconfirm
                                  title="您确定要支付吗"
                                  onConfirm={debounce(this.confirm, 1000)}
                                  onCancel={this.cancel}
                                  okText="确定"
                                  cancelText="取消"
                              >
                                <Button type='primary' onClick={this.handleOk}><ShoppingOutlined/>确认支付</Button>
                              </Popconfirm>
                              <Button type='primary' onClick={this.handleCancel}>取消</Button>
                        </span>
                    }
                >
                    <Form ref={this.formRef} initialValues={{number: 0}}>
                        <Item
                            name="number"
                            label="件数"
                            rules={[{required: true, message: "每人限购一件"}]}
                        >
                            <InputNumber min={0} max={1}
                                         onChange={(count) => this.setState({payMoney: count * record.seckillProductPrice})}/>
                        </Item>
                        <p>应付款:<span style={{marginLeft: '10px'}}>{payMoney}</span></p>
                    </Form>
                </Modal>;
                <Modal
                    title="秒杀活动暂未开启"
                    visible={this.state.isWaitModalVisible}
                    onCancel={this.handleWaitCancel}
                    footer={
                        <Button type='primary' onClick={this.handleWaitCancel}>退出</Button>
                    }
                >
                    <SecondKill seckillTime={this.state.seckillTime} seckillEnd={this.state.seckillEnd}/>
                </Modal>
                <Modal
                    title="秒杀活动"
                    visible={this.state.isEndModalVisible}
                    onCancel={this.handleEndCancel}
                    footer={
                        <Button type='primary' onClick={this.handleEndCancel}>退出</Button>
                    }
                >
                    <h4 style={{
                        color: '#988f8f',
                        fontSize: '18px',
                    }}>该秒杀活动已经结束</h4>
                </Modal>
                <Modal visible={this.state.isTipModalVisible} title={"购买须知"} footer={null}>
                    投资有风险，购买需谨慎！
                </Modal>
            </Card>

        </div>
    }
}

export default connect(
    state => ({products: state.products}, {user: state.auth}),
    {
        viewProductReq: viewProductReq,
        postOrder: postOrder,
        getPurchaseLink: getPurchaseLink
    }
)(withRouter(ProductSale))