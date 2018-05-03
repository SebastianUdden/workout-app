import React from 'react';
import Radium from 'radium';
import s from './login-style';

import Input from '../input/Input.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            submit: {
                id: 'submit',
                type: 'submit',
                value: 'Submit',
                style: s.loginButton
            }
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(
            document.getElementById('email').value, 
            document.getElementById('password').value);
    }

    render() {
        return (
            <div style={s.loginBox}>                 
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Login</h1>
                    <Input input={this.state.email} />
                    <Input input={this.state.password} />
                    <Input input={this.state.submit} />
                </form>
                <a
                    style={s.register} 
                    onClick={(tab) => this.props.switchPage(tab)}>Create account</a>
            </div>
        );
    }
}

export default Radium(Login);
