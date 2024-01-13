import React, { Component } from 'react';

import classnames from 'classnames'
import withRouter from '../../withRouter'
import { validatorInput } from '../../utils/validations/register';

import { Button, notification } from 'antd';
import { QuestionOutlined, CheckOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';


class registerForm extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        identityNumber: '',
        cardNumber: '',
        errors: {}, // 存储后台返回的错误信息
        isLoading: false
    }

    //输入处理
    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //提交处理
    handleSubmit = (e) => {
        const { userRegisterReq, addFlashMessage, navigate } = this.props
        e.preventDefault();
        this.setState({ isLoading: true })
        if (this.isValid()) {
            userRegisterReq(this.state).then(
                (response) => {
                    if (response.data.msg) {
                        console.log(response.data);
                        addFlashMessage({
                            type: 'success',
                            text: '注册成功,将自动跳转到登录页面'
                        })
                        navigate('/flash-message')
                    }
                },
                (error) => {
                    const errMsg = error.response.data //拿到后台返回的数据
                    // console.log(errMsg);
                    this.setState({ errors: errMsg, isLoading: false })
                }
            )
        }
    }

    //输入验证
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

    //查找用户是否存在
    checkUserExists = (e) => {
        const { userCheckUserReq } = this.props
        let { errors, isLoading } = this.state
        let identityNumber = e.target.value
        let key = e.target.name
        // console.log(username);
        console.log(errors);
        if (identityNumber !== "" && !errors.identityNumber) {
            userCheckUserReq(identityNumber).then(
                res => {
                    // console.log(res);   
                    if (res.data) {
                        // 已存在
                        // 更改一个数组的状态
                        errors[key] = '身份证已经存在'
                        isLoading = true;
                    }
                    else {
                        // console.log('成功');
                        errors[key] = ''
                        isLoading = false;
                    }
                    this.setState({ errors, isLoading })
                }
            )
        }
    }

    /**
     * 密码手机号身份证的正则验证
     * @param {event} e 
     */
    checkRegExists = (e) => {
        // console.log("checkRegExists方法执行");
        let { errors, isLoading } = this.state
        let data = e.target.value
        let key = e.target.name
        let reg = null

        //根据不同key分别进行处理
        switch (key) {
            case 'password':
                reg = /^(?![0-9]+$)(?![a-z][A-Z]+$)[0-9a-zA-Z~@#$%^&*._?]{6,18}$/;
                regTest(reg, data, '密码应为数字字母混合并为6-18位')
                this.setState({ errors, isLoading })
                break;
            case 'phoneNumber':
                reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                regTest(reg, data, '手机号码有误')
                this.setState({ errors, isLoading })
                break;
            case 'identityNumber':
                reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                regTest(reg, data, '身份证号码有误')
                this.setState({ errors, isLoading })
                this.checkUserExists(e)
                break;
            default:
                const { password, confirmPassword } = this.state
                if (password !== confirmPassword) {
                    errors[key] = '两次密码输入不一致'
                    isLoading = true
                }
                else {
                    errors[key] = ''
                    isLoading = false
                }
                if (!data) {
                    errors[key] = ''
                    isLoading = false;
                }
                this.setState({ errors, isLoading })
                break;
        }

        //正则判断方法
        function regTest(reg, data, info) {
            const result = reg.test(data)
            if (result) {
                //符合条件
                errors[key] = ''
                isLoading = false;
            }
            else {
                //不符合条件
                errors[key] = info
                isLoading = true;
            }
            if (!data) {
                errors[key] = ''
                isLoading = false;
            }
        }
    }

    //取消提示框
    cancelLogin = () => {
        const { navigate } = this.props
        navigate('/login')
    }

    //帮助提示框
    openNotification = () => {
        notification.open({
            message: '温馨提示',
            description:
                '注册成为我们的会员之后，您将享受到我们更加全面的服务',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };

    render() {
        const { errors, isLoading } = this.state
        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal register-item">
                <div className='form-group'>
                    <h2 className='col-sm-offset-5 col-sm-2 title'>用户注册</h2>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.username } )}>
                    <label className='col-sm-2 control-label'>用户名</label>
                    <div className='col-sm-8'>
                        <input name="username"
                            value={this.state.username}
                            onChange={this.handleValueChange}
                            type="text"
                            className="form-control"
                            placeholder="用户名" />
                        {errors.username && <span className="text-muted small"> {errors.username} </span>}
                    </div>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.cardNumber })}>
                    <label className='col-sm-2 control-label'>银行账户</label>
                    <div className='col-sm-8'>
                        <input name="cardNumber"
                            value={this.state.cardNumber}
                            onChange={this.handleValueChange}
                            type="input"
                            className="form-control"
                            placeholder="银行账户" />
                        {errors.cardNumber && <span className="text-muted small"> {errors.cardNumber} </span>}
                    </div>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.identityNumber })}>
                    <label className='col-sm-2 control-label'>身份证号</label>
                    <div className='col-sm-8'>
                        <input name="identityNumber"
                            value={this.state.identityNumber}
                            onChange={this.handleValueChange}
                            onBlur={this.checkRegExists}
                            type="input"
                            className="form-control"
                            placeholder="身份证号" />
                        {errors.identityNumber && <span className="text-muted small"> {errors.identityNumber} </span>}
                    </div>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.phoneNumber })}>
                    <label className='col-sm-2 control-label'>手机号</label>
                    <div className='col-sm-8'>
                        <input name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleValueChange}
                            onBlur={this.checkRegExists}
                            type="tel"
                            className="form-control"
                            placeholder="手机号" />
                        {errors.phoneNumber && <span className="text-muted small"> {errors.phoneNumber} </span>}
                    </div>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.password })}>
                    <label className='col-sm-2 control-label'>密码</label>
                    <div className='col-sm-8'>
                        <input name="password"
                            value={this.state.password}
                            onChange={this.handleValueChange}
                            onBlur={this.checkRegExists}
                            type="password"
                            className="form-control"
                            placeholder="密码" />
                        {errors.password && <span className="text-muted small"> {errors.password} </span>}
                    </div>
                </div>
                <div className={classnames('form-group', { 'has-error': errors.confirmPassword })}>
                    <label className='col-sm-2 control-label'>确认密码</label>
                    <div className='col-sm-8'>
                        <input name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleValueChange}
                            onBlur={this.checkRegExists}
                            type="password"
                            className="form-control"
                            placeholder="确认密码" />
                        {errors.confirmPassword && <span className="text-muted small"> {errors.confirmPassword} </span>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-8">
                        <Button onClick={this.cancelLogin} style={{ marginRight: '3px', marginLeft: '-10px' }} icon={<CloseOutlined />}>取消</Button>
                        <Button onClick={this.handleSubmit} disabled={isLoading} style={{ marginRight: '3px' }} icon={<CheckOutlined />}>注册</Button>
                        <Button onClick={this.openNotification} icon={<QuestionOutlined />}>帮助</Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(registerForm)
