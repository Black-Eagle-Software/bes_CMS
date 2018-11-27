import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class AuthRoute extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            isAuthenticated: false
        };
    }
    componentDidMount(){
        //this.verifyAuthentication();
    }
    verifyAuthentication(){
        fetch('/credentials/check').then(res=>{
          //console.log(res.status);
          let auth = this.state.isAuthenticated;
          if(res.status === 200){
              if(!auth){
                this.setState({isAuthenticated: true});
              }
          } else{
              this.setState({isAuthenticated: false});
          }
        });
      }
    render(){
        //this.verifyAuthentication();
        
        const props = Object.assign({}, this.props);

        if(this.props.isAuthenticated){
            return <Route {...props} />;
        }else{
            return <Redirect to="/" />;
        }
    }
}