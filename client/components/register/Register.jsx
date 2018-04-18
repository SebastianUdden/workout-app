
import React from 'react';
import Radium from 'radium';
import s from './register-style';

import Input from '../input/Input.jsx';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWrongPassword: false
        };
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let password = document.getElementById('password').value;
        if (password !== '' && password === document.getElementById('repeatPassword').value) {
            this.props.register(
                document.getElementById('firstname').value, 
                document.getElementById('lastname').value,
                document.getElementById('email').value, 
                document.getElementById('password').value);
            this.setState({showWrongPassword: false});
        } else {            
            this.setState({showWrongPassword: true});
        }
    }

    render() {       
        let firstname = {
            id: 'firstname',
            type: 'string',
            placeholder: 'Enter Firstname',
            style: s.loginInput
        };
        let lastname = {
            id: 'lastname',
            type: 'string',
            placeholder: 'Enter Lastname',
            style: s.loginInput
        };
        let email = {
            id: 'email',
            type: 'email',
            placeholder: 'Enter Email',
            style: s.loginInput
        };
        let password = {
            id: 'password',
            type: 'password',
            placeholder: 'Enter Password',
            style: s.loginInput
        };
        let repeatPassword = {
            id: 'repeatPassword',
            type: 'password',
            placeholder: 'Repeat Password',
            style: s.loginInput
        };
        let submit = {
            id: 'submit',
            type: 'submit',
            value: 'Submit',
            style: s.loginButton
        };

        return (
            <div style={s.loginBox}> 
                <form
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Register</h1>
                    <Input input={firstname} />
                    <Input input={lastname} />
                    <Input input={email} />
                    <Input input={password} />
                    <Input input={repeatPassword} />                    
                    {this.state.showWrongPassword ? 
                        <p style={s.password}>Passwords are not matching!</p>
                    : ''}
                    <Input input={submit} />
                </form>
                <a
                    style={s.cancel} 
                    onClick={(tab) => this.props.switchPage(tab)}>Cancel</a>
            </div>
        );
    }
}

export default Radium(Register);