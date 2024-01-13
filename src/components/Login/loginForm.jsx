import React, { Component } from 'react';
import classnames from 'classnames'
import { validatorInput } from '../../utils/validations/login'
import withRouter from '../../withRouter';
import title from '../images/logo.png'
import code1 from '../images/code_sx.jpg'
import code2 from '../images/code_sx_serve.jpg'

class loginForm extends Component {
    state = {
        username: '',
        password: '',
        errors: {},
        isLoading: false,
    }
    handleSubmit = (e) => {
        const { userLoginReq, navigate } = this.props
        const { username } = this.state
        e.preventDefault();
        if (this.isValid()) {
            userLoginReq(this.state).then(
                () => {
                    if (username === 'admin' || username === 'Admin') {
                        navigate('/admin')
                    }
                    else {
                        navigate('/product-display')
                    }
                },
                error => {
                    console.log('错误', error);
                    let { errors } = this.state
                    this.setState({ errors: { ...errors, info: '用户名或密码输入错误' } })
                    console.log(errors);
                    // console.log({...errors,info:error.msg});
                }
            )
        }
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isValid = () => {
        const { errors, isValid } = validatorInput(this.state)
        // console.log(isValid);
        if (!isValid) {
            this.setState({ errors })
        }
        else {
            this.setState({
                errors: {}
            })
        }
        return isValid;
    }
    render() {
        const { errors } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-horizontal login-form">
                    <div className='form-group'>
                        <label className='col-sm-offset-5 col-sm-2' style={{ fontSize: '20px', color: '#E1251B' }}><img src={title} alt="登录" style={{ marginLeft: '-80px' }}></img></label>
                    </div>
                    <div className='form-group'>
                        {errors.info && <span className="text-danger col-sm-3" style={{ marginLeft: '36%', fontWeight: '700' }}> {errors.info} </span>}
                    </div>
                    <div className={classnames('form-group', { 'has-error': errors.username })}>
                        <label className='col-sm-2 control-label'>用户名</label>
                        <div className='col-sm-8'>
                            <input name="username"
                                value={this.state.username}
                                onChange={this.handleValueChange}
                                type="text"
                                className="form-control"
                                placeholder="用户名或手机号" />
                            {errors.username && <span className="text-muted small"> {errors.username} </span>}
                        </div>
                    </div>
                    <div className={classnames('form-group', { 'has-error': errors.username })}>
                        <label className='col-sm-2 control-label'>密码</label>
                        <div className='col-sm-8'>
                            <input name="password"
                                value={this.state.password}
                                onChange={this.handleValueChange}
                                type="password"
                                className="form-control"
                                placeholder="密码" />
                            {errors.password && <span className="text-muted small"> {errors.password} </span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-8">
                            <button type="submit" className="btn btn-default">登录</button>
                        </div>
                    </div>
                </form>
                <div className='login-code'>

                    <div className='login-code-box'>
                        <h1>微信官方公众号</h1>
                        <img src={code1} alt="二维码" />
                        <img src={code2} alt="二维码" />
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(loginForm)