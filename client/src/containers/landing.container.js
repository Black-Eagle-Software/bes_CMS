import React from 'react';
import Header from '../components/header.component';
import LoginForm from '../components/login-form.component';
import logo from '../assets/images/Logo 3a_resized.png';

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show_login: false,
            show_register: false
        };        
    }
    handleHeaderBtnClick(name){
        switch (name){
            case 'home': break;
            case 'login': 
                        this.setState({show_login: true});
                        break;
            case 'register': break;
            case 'default': break;
        }
    }
    handleLogin(){
        this.props.onLogin();   //go to the user's home page
    }    
    
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap"
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
            width: "10em",
            margin: "0 auto 1em"
        };        

        const introStyle = {
            fontSize: "1.5em",
            textAlign: "center"
        };

        return(
            <div id={"content"} style={contStyle}>
                <Header isAuthenticated={false} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                <div style={pageStyle}>
                    <img style={logoStyle} src={logo} />
                    {!this.state.show_login && !this.state.show_register && 
                        <div style={introStyle}>
                            Welcome to the Black Eagle Software CMS.  
                            <br/>
                            Please login or register to continue.
                        </div>
                    }
                    {this.state.show_login &&
                        <LoginForm onLogin={()=>this.handleLogin()}/>
                    }
                </div>
            </div>
        );
    }
}