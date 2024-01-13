import React, { Component } from 'react'
import FlashMessage from './flashMessage'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'

class FlashMessageList extends Component {
    render() {
        /*
        测试数据
        const messages = [
            { id: 10001, type: 'success', text: '注册成功' },
            { id: 10002, type: 'danger', text: '注册信息有误,请重新输入' },
            { id: 10003, type: 'warning', text: '您确定要进行该操作吗' },
            { id: 10004, type: 'info', text: '请确认消息' }
        ]
        */
        const { messages } = this.props
        return (
            <div className='container flash-container'>
                {
                    messages.map((messageObj) => {
                        return (
                            <FlashMessage key={nanoid()} message={messageObj} />
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(
    state => ({ messages: state.flashMessage })
)(FlashMessageList)