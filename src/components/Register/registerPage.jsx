import React, {Component} from 'react';

import {connect} from 'react-redux';

import RegisterForm from './registerForm';

import * as registerActions from '../../actions/registerAction';
import * as flashActions from '../../actions/flashMessageAction';

class registerPage extends Component {
    render() {
        const {userRegisterReq, addFlashMessage, deleteFlashMessage, userCheckUserReq} = this.props
        return (
            <div className='row register-content'>
                <div className='col-md-3'/>
                <div className='col-md-6'>
                    <RegisterForm
                        userRegisterReq={userRegisterReq}
                        userCheckUserReq={userCheckUserReq}
                        addFlashMessage={addFlashMessage}
                        deleteFlashMessage={deleteFlashMessage}

                    />
                </div>
                <div className='col-md-3'/>
            </div>
        );
    }
}

// state:null
// mapDispatchToProps: userRegisterreq
// const mapDispatchToProps = (dispatch) => {
//   return {
//     userRegisterReq:bindActionCreators(userRegisterReq,dispatch)
//   }
// }

export default connect(
    null,
    {
        userRegisterReq: registerActions.userRegisterReq,
        userCheckUserReq: registerActions.userCheckUserReq,
        addFlashMessage: flashActions.addFlashMessage,
        deleteFlashMessage: flashActions.deleteFlashMessage,
    }
    // mapDispatchToProps
)(registerPage)