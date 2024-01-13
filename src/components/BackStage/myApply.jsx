import {Card, Table, DatePicker, Button, Input, Space, message} from 'antd'
import React, {Component} from 'react'
import locale from 'antd/es/date-picker/locale/zh_CN';
import {getApplyUserInfoReq, selectApplyByDate} from "../../actions/userControlAction";
import {connect} from "react-redux";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const {RangePicker} = DatePicker;

class myApply extends Component {
    state = {
        // applies: [
        //     {applyId:1,applyName:'用户1',applyDate:'2022-04-14 19:36:12',applyState:'是'},
        //     {applyId:2,applyName:'用户2',applyDate:'2022-04-14 19:34:21',applyState:'是'},
        //     {applyId:3,applyName:'用户3',applyDate:'2022-04-14 19:36:50',applyState:'是'},
        //     {applyId:4,applyName:'用户4',applyDate:'2022-04-14 19:35:12',applyState:'是'},
        //     {applyId:5,applyName:'用户5',applyDate:'2022-04-14 19:33:12',applyState:'否'}
        // ],
        applies: [],
        users: [],
        searchText: '',
        searchedColumn: ''
    }

    componentDidMount() {
        this.setState({applies:[]})
        this.props.getApplyUserInfoReq().then(
            res => {
                const applies = res.data.result
                console.log(applies);
                applies.map((applyObj) => {
                    applyObj.key = applyObj.applyId
                    if (applyObj.isSuccess === '1') {
                        applyObj.applyState = '是'
                    } else {
                        applyObj.applyState = '否'
                    }
                    applyObj.applyDate = new Date(applyObj.applyDate).toLocaleString()
                    applyObj.applyName = applyObj.username
                })
                this.setState({applies})
            },
            error => {
                console.log(error);
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
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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

    columns = [
        {title: '申请编号', dataIndex: 'applyId'},
        {title: '申请人', dataIndex: 'applyName', filterMode: 'menu', ...this.getColumnSearchProps('applyName'),},
        {
            title: '申请日期', dataIndex: 'applyDate',
            filterDropdown: <RangePicker locale={locale}
                                         onChange={(dates, dateStrings) => this.handleChange(dates, dateStrings)}/>,
        },
        {title: '能否购买', dataIndex: 'applyState', ...this.getColumnSearchProps('applyState'),},
    ];

    handleChange = (dates, dateStrings) => {
        // console.log(dateStrings);
        const startDate = dateStrings[0]
        const endDate = dateStrings[1]
        //传递给后端
        console.log(startDate, endDate);
        this.props.selectApplyByDate(startDate, endDate).then(
            res => {
                const users = res.data.result
                users.map(
                    (userObj) => {
                        userObj.key = userObj.applyId
                        if (userObj.isSuccess === '1') {
                            userObj.applyState = '是'
                        } else {
                            userObj.applyState = '否'
                        }
                        userObj.applyDate = new Date(userObj.applyDate).toLocaleString()
                        userObj.applyName = userObj.username
                    }
                )
                console.log('users', users);
                this.setState({users})
                message.success('已显示' + users.length + '条数据');
            },
            error => {
                console.log(error);
            }
        )
    }

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


    render() {
        const {applies, users} = this.state
        return (
            <Card title="申请记录">
                <Table dataSource={users.length===0 ? applies : users} columns={this.columns} pagination={{pageSize: 5}}>

                </Table>
            </Card>
        )
    }
}

export default connect(
    null,
    {
        selectApplyByDate,
        getApplyUserInfoReq
    }
)(myApply)