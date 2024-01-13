import React from 'react';
import ReactDOM from 'react-dom';

import logger from 'redux-logger' //日志信息
import thunk from 'redux-thunk' //异步操作

import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, createStore} from 'redux';

import rootReducer from './reducers';
import {Provider} from 'react-redux';

import routers from './routers';
import {BrowserRouter as Router} from 'react-router-dom';

import {setAuthorizationToken} from './utils/validations/setAuthorizationToken';
import {setCurrentAdmin, setCurrentUser} from './actions/authAction';
import jwtDecode from 'jwt-decode'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk))); //初始化store

//保证刷新时token仍然存在
if (localStorage.loginToken) {
    const loginToken = localStorage.loginToken
    setAuthorizationToken(loginToken)
    const userInfo = jwtDecode(loginToken)
    if (userInfo.username) {
        store.dispatch(setCurrentUser(jwtDecode(loginToken)))
    }
    if (userInfo.adminName) {
        store.dispatch(setCurrentAdmin(jwtDecode(loginToken)))

    }

}


ReactDOM.render(
    <Provider store={store}>
        <Router>
            {routers}
        </Router>
    </Provider>
    , document.getElementById('root')
);

