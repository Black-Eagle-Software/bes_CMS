import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthRoute extends React.Component{
    render(){        
        const props = Object.assign({}, this.props);

        if(this.props.isAuthenticated){
            return <Route {...props} />;
        }else{
            return <Redirect to="/" />;
        }
    }
}