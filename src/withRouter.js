import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// withRouter封装
export default function withRouter (Component) {
    return (props) => (
        <Component {...props} 
        params={useParams()} 
        location={useLocation()} 
        navigate={useNavigate()}
        search={useLocation()}/>
    );
}