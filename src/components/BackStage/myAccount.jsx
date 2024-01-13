import React, {Component} from 'react';
import {Button, Card, DatePicker, Input, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import {connect} from "react-redux"
import {getSuccessUserInfoReq} from "../../actions/userControlAction";

class MyAccount extends Component {
    state = {
        // accountData: [
        //     {
        //         key: '1',
        //         username: '小李',
        //         seckillProductName: '东方红',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-11'
        //     },
        //     {
        //         key: '2',
        //         username: '小王',
        //         seckillProductName: '景顺陶瓷',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-10'
        //     },
        //     {
        //         key: '3',
        //         username: '小李',
        //         seckillProductName: '沁园春',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-10'
        //     },
        // ],
        accountData: [],
        // displayAccountData: [
        //     {
        //         key: '1',
        //         username: '小李',
        //         seckillProductName: '东方红',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-11'
        //     },
        //     {
        //         key: '2',
        //         username: '小王',
        //         seckillProductName: '景顺陶瓷',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-10'
        //     },
        //     {
        //         key: '3',
        //         username: '小李',
        //         seckillProductName: '沁园春',
        //         seckillProductPrice: '10000',
        //         seckillTime: '2022-04-10'
        //     },
        // ],
        displayAccountData: [],
        searchText: '',
        searchedColumn: '',
        searchDate: '',
    }

    componentDidMount() {
        // this.getSuccessUserInfo()
    }
    getSuccessUserInfo = () => {
        this.props.getSuccessUserInfoReq().then(
            res => {
                console.log(res.data);
                const successUsers = res.data.result
                let newSuccessUsers = []
                successUsers.map((userObj) => {
                    newSuccessUsers = [...newSuccessUsers,{
                        key:userObj.userId,
                        username:userObj.username,
                        seckillProductName:userObj.productName,
                        seckillProductPrice:10000,
                        seckillTime:moment(new Date(userObj.lastLoginTime)).format('YYYY-MM-DD')
                    }]
                })
                this.setState({
                    accountData:newSuccessUsers,
                    displayAccountData:newSuccessUsers
                })
            }
        )
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={"搜索项"}
                    value={selectedKeys[0]}
                    onChange={e => {setSelectedKeys(e.target.value ? [e.target.value] : [])}}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        搜索
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                        重置
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        过滤
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    searchDate = (date) => {
        this.setState({displayAccountData:[]})
        let tempAccountData = []
        this.state.accountData.map((accountObj) => {
            if (accountObj.seckillTime === date) {
                tempAccountData = [...tempAccountData, accountObj]
            }
        })
        this.setState({displayAccountData:tempAccountData})
        tempAccountData = []
    }

    resetDate = () => {
        this.setState({displayAccountData:this.state.accountData})
    }

    columns = [
        {
            title: '购买人',
            dataIndex: 'username',
            key: 'username',
            filterMode: 'menu', ...this.getColumnSearchProps('username'),
        },
        {
            title: '购买产品',
            dataIndex: 'seckillProductName',
            key: 'seckillProductName',
            filterMode: 'menu', ...this.getColumnSearchProps('seckillProductName'),
        },
        {title: '购买金额', dataIndex: 'seckillProductPrice', key: 'seckillProductPrice',},
        {
            title: '购买时间',
            dataIndex: 'seckillTime',
            key: 'seckillTime',
            // filterMode: 'menu',
            filterDropdown: (<Space style={{padding: 8}}><DatePicker onChange={(date) => this.setState({searchDate:moment(date).format('YYYY-MM-DD')})}/><Button onClick={() => this.searchDate(this.state.searchDate)} type={"primary"}>搜索</Button><Button onClick={this.resetDate}>重置</Button></Space>),
        }
    ]

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }


    render() {
        return (
            <Card title="账户明细">
                <Table
                    dataSource={this.state.displayAccountData}
                    columns={this.columns}
                    pagination={{defaultPageSize: 4}}
                    bordered
                />
            </Card>
        );
    }
}

export default connect(
    null,
    {
        getSuccessUserInfoReq
    }
)(MyAccount);