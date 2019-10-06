import React from 'react';
import axios from 'axios';

export default class UserPassUpdateForm extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            is_email_bad: true,
            old_password: "",
            is_password_bad: true,
            new_password: '',
            is_new_pass_bad: true,
            is_confirm_new_pass_bad: true,
            error_msg: ''
        };
    }

    handleEmailChange(event){
        let val = event.target.value;
        let bad = val === "" || val.indexOf('@') === -1;
        this.setState({email: val, is_email_bad: bad});
    }
    handleCurrentPasswordChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({old_password: val, is_password_bad: bad});
    }
    handleNewPasswordChange(event){
        let val = event.target.value;
        let bad = val === "";
        this.setState({new_password: val, is_new_pass_bad: bad});
    }
    handleConfirmNewPasswordChange(event){
        let val = event.target.value;
        let bad = val === "" || val !== this.state.new_password;
        this.setState({is_confirm_new_pass_bad: bad});
    }
    handleFormSubmit(event){
        if(this.state.email === "" || this.state.old_password === "" || this.state.new_password === ''){
            return;
        }
        this.setState({error_msg: ''});
        let data = {email: this.state.email, old_password: this.state.old_password, new_password: this.state.new_password};
        axios.post("/api/auth/passwordChange", data).then(res=>{
            if(res.status === 200){
                this.props.onUpdatePass();
            }
        }).catch((error)=>{
            //TODO: need to do something more robust with this error handling
            console.log(error);
            this.setState({error_msg: error.response.data.message});
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

        const emailClass = this.state.is_email_bad ? "bad_input" : "";
        const passClass = this.state.is_password_bad ? "bad_input" : "";
        const newClass = this.state.is_new_pass_bad ? 'bad_input' : '';
        const confClass = this.state.is_confirm_new_pass_bad ? "bad_input" : "";

        const disableSubmit = this.state.is_email_bad || this.state.is_password_bad || this.state.is_new_pass_bad || this.state.is_confirm_new_pass_bad;

        return(
            <form style={formStyle} onSubmit={(e)=>this.handleFormSubmit(e)}>
                <label style={inputStyle}>User password must be updated before login</label>
                {this.state.error_msg !== '' &&
                    <div className='bad_input' style={inputStyle}>{this.state.error_msg}</div>
                }
                <input className={emailClass} style={inputStyle} type='text' name='email' placeholder='Email' required autoFocus onChange={(e)=>this.handleEmailChange(e)}/>
                <input className={passClass} style={inputStyle} type='password' name='password' placeholder='Current Password' required onChange={(e)=>this.handleCurrentPasswordChange(e)}/>
                <input className={newClass} style={inputStyle} type='password' name='password' placeholder='New Password' required onChange={(e)=>this.handleNewPasswordChange(e)}/>
                <input className={confClass} style={inputStyle} type='password' name='password' placeholder='Confirm New Password' required onChange={(e)=>this.handleConfirmNewPasswordChange(e)}/>
                <input style={inputStyle} type='submit' value='Update password' disabled={disableSubmit}/>
            </form>
            );
    }
}