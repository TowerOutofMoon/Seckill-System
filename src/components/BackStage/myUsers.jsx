import React, {Component} from 'react'
import {Table, Button, Modal, Form, Input, Card, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import {showUsersReq, addUser, deleteUser, addUserReq, deleteUserReq, storeUsers} from '../../actions/adminAction';
import {connect} from 'react-redux';
import {nanoid} from 'nanoid';
import {findIndex} from "lodash";
import {Link} from "react-router-dom";
import {getOverdueUserInfoReq} from "../../actions/userControlAction";

const Item = Form.Item

class MyUsers extends Component {
    state = ({
        users: [
            {
                username: "LaMarcus Aldridge",
                password: 'qwe5069673219',
                phoneNumber: '15850696039',
                identityNumber: '431021200208050015',
                accountNumber: '2006010408',
                key: '1'
            },
            {
                username: "Kawhi Leonard",
                password: '123456789aa',
                phoneNumber: '15850696036',
                identityNumber: '431021200208050014',
                accountNumber: '2006010408',
                key: '2'
            },
            {
                username: "Klay Thompson",
                password: '1123456789',
                phoneNumber: '15850596039',
                identityNumber: '431021200208090015',
                accountNumber: '2006010403',
                key: '3'
            },
            {
                username: "Stephen Curry",
                password: '12345678910',
                phoneNumber: '15850696039',
                identityNumber: '431021200408050015',
                accountNumber: '2006010412',
                key: '4'
            },
        ], //user数据
        displayUsers: [
            {
                username: "LaMarcus Aldridge",
                password: 'qwe5069673219',
                phoneNumber: '15850696039',
                identityNumber: '431021200208050015',
                accountNumber: '2006010408',
                key: '1'
            },
            {
                username: "Kawhi Leonard",
                password: '123456789aa',
                phoneNumber: '15850696036',
                identityNumber: '431021200208050014',
                accountNumber: '2006010408',
                key: '2'
            },
            {
                username: "Klay Thompson",
                password: '1123456789',
                phoneNumber: '15850596039',
                identityNumber: '431021200208090015',
                accountNumber: '2006010403',
                key: '3'
            },
            {
                username: "Stephen Curry",
                password: '12345678910',
                phoneNumber: '15850696039',
                identityNumber: '431021200408050015',
                accountNumber: '2006010412',
                key: '4'
            },
        ], //展示的user数据
        record: {},//存储某一行的数据
        isLoading: false,
        isModalVisible: false,
    })

    formRef = React.createRef()

    initColumns = () => {
        this.columns = [
            {title: '用户名', dataIndex: 'username', key: 'username'},
            {title: '手机号', dataIndex: 'phoneNumber', key: 'phoneNumber'},
            {title: '身份证号', dataIndex: 'identityNumber', key: 'identityNumber'},
            {title: '银行卡号', dataIndex: 'accountNumber', key: 'accountNumber'},
            {title: '逾期次数', dataIndex: 'overdueTimes', key: 'overdueTimes', },
            {title: '是否定期存款', dataIndex: 'isStore', key: 'isStore', },
            {title: '是否贷款', dataIndex: 'isBorrow', key: 'isBorrow',},
            {title: '逾期时间', dataIndex: 'overdueDays', key: 'overdueDays', },
            {title: '工作状态', dataIndex: 'workingState', key: 'workingState', },
            {
                title: '操作', dataIndex: 'action', align: 'center', key: 'action',
                render: (text, record) => {
                    return (<span>
                        <Button onClick={() => {
                            this.deleteUser(record)
                        }} type="link">删除用户</Button>
                        <Link to={`/admin/user-info-control/:${record.identityNumber}`}>编辑用户</Link>
                    </span>)
                }
            },
        ];
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.showUsers()
    }

    //操作Modal的方法
    showUsers = () => {
        const {getOverdueUserInfoReq, storeUsers} = this.props
        this.setState({displayUsers:[]})
        getOverdueUserInfoReq().then(
            (response) => {
                this.setState({isLoading: true})
                let myUsers = response.data.result
                console.log('@myUsers',myUsers);
                myUsers.map((userObj) => {
                    userObj.key = userObj.user_id
                    userObj.id = userObj.user_id
                    userObj.phoneNumber = userObj.phone_number
                    userObj.identityNumber = userObj.identity_number
                    userObj.accountNumber = userObj.account_number
                    userObj.overdueDays = userObj.overdue_days
                    userObj.overdueTimes = userObj.overdue_times
                    if (userObj.is_store === 0) {
                        userObj.isStore = '否'
                    }
                    else {
                        userObj.isStore = '是'
                    }
                    if (userObj.is_borrow === 0) {
                        userObj.isBorrow = '否'
                    }
                    else {
                        userObj.isBorrow = '是'
                    }
                    if (userObj.working_state === 0) {
                        userObj.workingState = '在职'
                    } else if (userObj.working_state === 1) {
                        userObj.workingState = '退休'
                    } else {
                        userObj.workingState = '肄业'
                    }
                })
                console.log('user信息', myUsers);
                // storeUsers(myUsers)
                this.setState({users: myUsers,displayUsers: myUsers})
                this.setState({isLoading: false})
            },
            (error) => {
                console.log(error);
            }
        )
    }

    showModal = () => {
        this.setState({isModalVisible: true})
    }

    handleCancel = () => {
        this.setState({isModalVisible: false})
    }

    //验证方法
    onFinish = () => {
        const currNode = this.formRef.current
        const {addUserReq, addUser} = this.props
        // //1.获取到表单数据
        currNode.validateFields().then(
            (userData) => {
                userData.key = nanoid()
                console.log(userData);
                // 2.更新数据库
                addUserReq(userData).then(
                    (res) => {
                        if (res.data.code === "500") {
                            message.error("添加失败!")
                        } else {
                            // 3.执行addUser,将user放到redux中
                            addUser(userData)
                            // 4.改变状态
                            this.setState({
                                isModalVisible: false,
                                users: [...this.state.users, userData]
                            })
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                )


            },
            (error) => {
                console.log(error);
                this.setState({
                    isModalVisible: true
                })
            }
        );

    }

    deleteUser = (record) => {
        const id = record.key
        const {users} = this.state
        const {deleteUser, deleteUserReq} = this.props
        deleteUserReq(id).then(
            res => {
                if (res.data.code === "500") {
                    message.error("删除失败!")
                } else {
                    deleteUser(id)
                    //4.更新状态id
                    const index = findIndex(users, {key: id})
                    // console.log(users);
                    console.log('@delete', index)
                    if (index >= 0) {
                        const newUsers = [...users.slice(0, index), ...users.slice(index + 1)]
                        console.log('@newUsers',newUsers);
                        this.setState({displayUsers: newUsers})
                    }

                }
            },
            (error) => {
                console.log(error);
            }
        )


    }

    render() {
        return (
            <Card title="用户基本" extra={<Button type="primary" onClick={this.showModal}><PlusOutlined/>添加</Button>}
                  style={{width: '100%'}}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.displayUsers}
                    pagination={{defaultPageSize: 4}}
                    loading={this.state.isLoading}
                />
                <Modal
                    title="添加用户"
                    visible={this.state.isModalVisible}
                    destroyOnClose='true'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button type="primary" onClick={this.onFinish} key={'submit'}>
                            添加
                        </Button>
                    ]}
                >
                    <Form ref={this.formRef} labelCol={{span: 4}}>
                        <Item
                            name="username"
                            label="用户名"
                            rules={[
                                {required: true, message: 'Please input your username'},
                                {min: 2, max: 15, message: 'The range of length from 2 to 15'},
                            ]}
                        >
                            <Input placeholder='用户名'/>
                        </Item>
                        <Item
                            name="password"
                            label="密码"
                            rules={[
                                {required: true, message: 'Please input your password'},
                                {min: 6, max: 18, message: 'The range of length is between 6 and 18'},
                                {
                                    pattern: /^(?![0-9]+$)(?![a-z][A-Z]+$)[0-9a-zA-Z~@#$%^&*._?]{6,18}$/,
                                    message: 'Your password is out of rules(The password shall consist of numbers and letters)'
                                }
                            ]}
                        >
                            <Input placeholder='密码'/>
                        </Item>
                        <Item
                            name="phoneNumber"
                            label="手机号"
                            rules={[
                                {required: true, message: 'Please input your phone-number'},
                                {
                                    pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                                    message: 'The phone-number does not exists'
                                },
                            ]}
                        >
                            <Input placeholder='手机号'/>
                        </Item>
                        <Item
                            name="identityNumber"
                            label="身份证号"
                            rules={[
                                {required: true, message: 'Please input your identity-number'},
                                {
                                    pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                                    message: 'The identity-number does not exists'
                                },
                            ]}
                        >
                            <Input placeholder='身份证号'/>
                        </Item>
                        <Item
                            name="accountNumber"
                            label="银行卡号"
                            rules={[{required: true, message: 'Please input your identity-number'}]}
                        >
                            <Input placeholder='银行卡号'/>
                        </Item>
                    </Form>
                </Modal>
            </Card>
        );
    }
}

export default connect(
    state => ({users: state.users}),
    {
        showUsersReq,
        addUser,
        deleteUser,
        addUserReq,
        deleteUserReq,
        storeUsers,
        getOverdueUserInfoReq
    }
)(MyUsers)