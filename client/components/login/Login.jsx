import React from 'react';
import Radium from 'radium';
import s from './login-style';

import Stamp from '../tools/stamp/Stamp.jsx';

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
                <a
                    style={s.register} 
                    onClick={(tab) => this.props.switchPage(tab)}>Create account</a>
            </div>
        );
    }
}

export default Radium(Login);

// <Stamp 
//                     onTop={false}
//                     text="Demo-email: john.doe@gmail.com"
//                     color={s.stampColor}
//                     size="4"
//                     xPercentage="30"
//                     yPercentage="-17.1"
//                     rotation="20" />
//                 <Stamp 
//                     onTop={false}
//                     text="Demo-password: password"
//                     color={s.stampColor}
//                     size="4"
//                     xPercentage="30"
//                     yPercentage="-7.1"
//                     rotation="20" />