import classNames from 'classnames'
import React, { Component } from 'react'
import withRouter from '../../withRouter'
import { Link } from 'react-router-dom'

class FlashMessage extends Component {
    state = { timeOut: 5 }

    componentDidMount() {
        this.timer = setInterval(() => {
            const { timeOut } = this.state
            if (timeOut > 0) {
                this.setState({ timeOut: timeOut - 1 })
            }
            else {
                this.setState({ timeOut: 5 })
                this.props.navigate(`/login/?id=${this.props.message.id}`)
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const { type, text } = this.props.message
        return (
            <div
                className={classNames('alert',
                    {
                        'alert-success': type === 'success',
                        'alert-danger': type === 'danger',
                        'alert-info': type === 'info',
                        'alert-warning': type === 'warning'
                    }
                )}
            >
                <span> {text} </span>
                <span style={{ fontSize: '12px' }}> ({this.state.timeOut}s后自动跳转...)</span>
                <Link to={`/login/?id=${this.props.message.id}`} className="alert-link pull-right">点击直接跳转</Link>
            </div>
        )
    }
}
export default withRouter(FlashMessage)