import React, { Component } from 'react';
import withRouter from '../../withRouter';
import LoginForm from './loginForm'
import { connect } from 'react-redux';
import * as flashActions from '../../actions/flashMessageAction';
import * as authActions from '../../actions/authAction'
import qs from 'query-string'


class loginPage extends Component {

  //处理未删除的FlashMessage
  componentDidMount() {
    if (this.props.location.search) {
      console.log(this.props.location.search);
      const { location: { search }, deleteFlashMessage } = this.props
      const id = qs.parse(search).id
      deleteFlashMessage(id)
    }
  }
  render() {

    return (
        <div className='row login-content'>
          <div className='col-md-12'>
            <LoginForm userLoginReq={this.props.userLoginReq} />
          </div>
        </div>
    );
  }
}

export default connect(
  null,
  {
    deleteFlashMessage: flashActions.deleteFlashMessage,
    userLoginReq: authActions.userLoginReq
  }
  // mapDispatchToProps
)(withRouter(loginPage))