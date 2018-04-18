import React from 'react';
import Radium from 'radium';
import s from './login-style';

import Input from '../input/Input.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(
            document.getElementById('email').value, 
            document.getElementById('password').value);
    }

    render() {
        let email = {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            style: s.loginInput
        };
        let password = {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
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
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Login</h1>
                    <Input input={email} />
                    <Input input={password} />
                    <Input input={submit} />
                </form>
                <a
                    style={s.register} 
                    onClick={(tab) => this.props.switchPage(tab)}>Create account</a>
            </div>
        );
    }
}

export default Radium(Login);
