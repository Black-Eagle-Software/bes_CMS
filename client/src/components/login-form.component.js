import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            is_email_bad: true,
            password: "",
            is_password_bad: true,
            redirectTo: null
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    handleEmailChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({email: val, is_email_bad: bad});
    }
    handlePasswordChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({password: val, is_password_bad: bad});
    }
    handleFormSubmit(event){
        if(this.state.email === "" || this.state.password === ""){
            return;
        }
        let data = {email: this.state.email, password: this.state.password};
        console.log(data);
        axios.post("/api/login", data).then(res=>{
            if(res.status === 200){
                this.setState({redirectTo: '/home'});
                this.props.onLogin();
            }
        });
        event.preventDefault();
    }

    render(){
        if(this.state.redirectTo){
            return <Redirect to={{pathname: this.state.redirectTo}}/>
        } else {
            const formStyle = {
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                justifyContent: "center"
            };

            const inputStyle = {
                width: "80%",
                margin: ".25em",
                fontSize: "1em"
            };

            const emailClass = this.state.is_email_bad ? "bad_input" : "";
            const passClass = this.state.is_password_bad ? "bad_input" : "";

            return(
                <form style={formStyle} onSubmit={this.handleFormSubmit}>
                    <input className={emailClass} style={inputStyle} type='text' name='email' placeholder='Email' required autoFocus onChange={this.handleEmailChange}/>
                    <input className={passClass} style={inputStyle} type='password' name='password' placeholder='Password' required onChange={this.handlePasswordChange}/>
                    <input style={inputStyle} type='submit' value='Log in'/>
                </form>
                );
        }
    }
}