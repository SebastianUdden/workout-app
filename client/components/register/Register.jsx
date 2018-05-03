
import React from 'react';
import Radium from 'radium';
import s from './register-style';

import Input from '../input/Input.jsx';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWrongPassword: false,
            firstname: {
                id: 'firstname',
                type: 'string',
                placeholder: 'Enter Firstname',
                style: s.loginInput
            },
            lastname: {
                id: 'lastname',
                type: 'string',
                placeholder: 'Enter Lastname',
                style: s.loginInput
            },
            email: {
                id: 'email',
                type: 'email',
                placeholder: 'Enter Email',
                style: s.loginInput
            },
            password: {
                id: 'password',
                type: 'password',
                placeholder: 'Enter Password',
                style: s.loginInput
            },
            repeatPassword: {
                id: 'repeatPassword',
                type: 'password',
                placeholder: 'Repeat Password',
                style: s.loginInput
            },
            submit: {
                id: 'submit',
                type: 'submit',
                value: 'Submit',
                style: s.loginButton
            }
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
        return (
            <div style={s.loginBox}> 
                <form
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Register</h1>
                    <Input input={this.state.firstname} />
                    <Input input={this.state.lastname} />
                    <Input input={this.state.email} />
                    <Input input={this.state.password} />
                    <Input input={this.state.repeatPassword} />                    
                    {this.state.showWrongPassword ? 
                        <p style={s.password}>Passwords are not matching!</p>
                    : ''}
                    <Input input={this.state.submit} />
                </form>
                <a
                    style={s.cancel} 
                    onClick={(tab) => this.props.switchPage(tab)}>Cancel</a>
            </div>
        );
    }
}

export default Radium(Register);