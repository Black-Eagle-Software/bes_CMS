import React from 'react';
import axios from 'axios';

export default class RegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email: "",
            name: "",
            password: "",
            is_email_bad: false,
            is_name_bad: false,
            is_password_bad: false
        };
    }
    handleEmailChange(event){
        let val = event.target.value;
        let bad = val === "" || val.indexOf('@') === -1;
        this.setState({email: val, is_email_bad: bad});
    }
    handleNameChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({name: val, is_name_bad: bad});
    }
    handlePasswordChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({password: val, is_password_bad: bad});
    }
    handleFormSubmit(event){
        if(this.state.email === "" || this.state.password === "" || this.state.name === ""){
            return;
        }
        let data = {name: this.state.name, email: this.state.email, password: this.state.password};
        console.log(data);
        return;
        //we don't have the api sorted out just yet
        axios.post("/api/auth/register", data).then(res=>{
            if(res.status === 200){
                //this.setState({redirectTo: '/home'});
                this.props.onRegister();
                //res.redirect('/home');
            }
        });
        event.preventDefault();
    }
    render(){
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

        return(
            <form style={formStyle} onSubmit={this.handleFormSubmit}>
                <input style={inputStyle} type='text' name='name' placeholder='Name' required autoFocus onChange={this.handleNameChange}/>
                <input style={inputStyle} type='text' name='email' placeholder='Email' required onChange={this.handleEmailChange}/>
                <input style={inputStyle} type='password' name='password' placeholder='Password' required onChange={this.handlePasswordChange}/>
                <input style={inputStyle} type='submit' value='Register user'/>
            </form>
        );
    }
}