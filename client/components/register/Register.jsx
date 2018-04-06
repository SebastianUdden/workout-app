
import React from 'react';
import Radium from 'radium';
import s from './register-style';

import Stamp from '../tools/stamp/Stamp.jsx';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWrongPassword: false
        }
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
                    <input 
                        id="firstname"
                        style={s.loginInput} 
                        type="string" 
                        placeholder="Enter Firstname" />
                    <input 
                        id="lastname"
                        style={s.loginInput} 
                        type="string" 
                        placeholder="Enter Lastname" />
                    <input 
                        id="email"
                        style={s.loginInput} 
                        type="email" 
                        placeholder="Enter Email" />
                    <input 
                        id="password"
                        style={s.loginInput} 
                        type="password" 
                        placeholder="Enter Password" />
                    <input 
                        id="repeatPassword"
                        style={s.loginInput} 
                        type="password" 
                        placeholder="Repeat Password" />
                    {this.state.showWrongPassword ? 
                        <p style={s.password}>Passwords are not matching!</p>
                    : ''}
                    <input
                        type="submit" 
                        style={s.loginButton}
                        value="Submit" />
                </form>
                <a
                    style={s.cancel} 
                    onClick={(tab) => this.props.switchPage(tab)}>Cancel</a>
            </div>
        );
    }
}

export default Radium(Register);