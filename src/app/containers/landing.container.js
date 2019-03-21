import React from 'react';
import LoginForm from '../components/login-form.component';
import RegisterForm from '../components/register-form.component';
import UserPassUpdateForm from '../components/user-pass-update-form.component';

export default class Landing extends React.PureComponent{
    handleLogin(){
        this.props.onLogin();   //go to the user's home page
    }
    handleRegister(){
        this.props.onRegister();
    }
    handleUpdateRequired(){
        this.props.onUpdateRequired();
    }
    handleUpdatePass(){
        this.props.onUpdatePass();
    }  
    
    render(){
        const contStyle = {
            /*display: "flex",
            flexFlow: "row wrap"*/
            height: "100%",
            width: "100%"
        };
        const pageStyle = {
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "1em",
            marginRight: "1em",
            width: "100%",
            height: "100%"
        };        

        const logoStyle = {
            display: "block",
            width: "15em",
            margin: "0 auto 1em"
        };        

        const introStyle = {
            fontSize: "1.5em",
            textAlign: "center"
        };

        return(
            <div style={contStyle}>
                <div style={pageStyle}>
                    <img style={logoStyle} src="Logo-4a.png" />
                    {!this.props.show_login && !this.props.show_register && !this.props.show_update &&
                        <div style={introStyle}>
                            Welcome to the Black Eagle Software CMS.  
                            <br/>
                            Please login or register to continue.
                        </div>
                    }
                    {this.props.show_login &&
                        <LoginForm onLogin={()=>this.handleLogin()} onUpdateRequired={()=>this.handleUpdateRequired()}/>
                    }
                    {this.props.show_register &&
                        <RegisterForm onRegister={()=>this.handleRegister()}/>
                    }
                    {this.props.show_update && 
                        <UserPassUpdateForm onUpdatePass={()=>this.handleUpdatePass()}/>
                    }
                </div>
            </div>
        );
    }
}