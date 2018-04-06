import React from 'react';
import Radium from 'radium';
import s from './login-style';

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
        return (
            <div style={s.loginBox}> 
                <form
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>Login</h1>
                    <input 
                        id="email"
                        style={s.loginInput} 
                        type="email" 
                        placeholder="Email" />
                    <input 
                        id="password"
                        style={s.loginInput} 
                        type="password" 
                        placeholder="Password" />
                    <input
                        type="submit" 
                        style={s.loginButton}
                        value="Submit" />
                </form>
            </div>
        );
    }
}

export default Radium(Login);