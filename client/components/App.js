import React from 'react';
import BoxContainer from './box-container/BoxContainer.jsx';

import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import AppContent from './app-content/AppContent.jsx';
import AppFooter from './app-footer/AppFooter.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        let backEndUrl = 'https://arcane-journey-35345.herokuapp.com';            
        // let backEndUrl = 'http://localhost:3005';
        this.state = {
            usersUrl: backEndUrl + '/api/users/',
            registryUrl: backEndUrl + '/api/registry/users/',
            registry: undefined,
            userId: undefined,
            profile: undefined,
            page: 0,
            loggedIn: false,
            wrongLogin: 0
        };
    }

    logout() {
        this.setState({
            page: 0,
            loggedIn: false,
            wrongLogin: 0,
            profile: undefined
        });
    }    

    login(email, password) {
        fetch(this.state.registryUrl)
            .then((data) => data.json())
            .then((data) => {           
                this.setState({registry: data});                             
            })        
            .catch((error) => {
                console.log('Something went wrong...');
            });
        
        setTimeout(() => { 
            if (this.state.registry) {
                for (let user of this.state.registry) {
                    if (user.email === email && user.password === password) {
                        this.setState({
                            userId: user.userModelId,
                            page: 0,
                            loggedIn: false,
                            wrongLogin: 0
                        });
                        if (this.state.userId) {
                            fetch(this.state.usersUrl + this.state.userId)
                                .then((data) => data.json())
                                .then((data) => {
                                    let profile = data;
                                    this.setState({
                                        userId: user.userModelId,
                                        page: 1,
                                        loggedIn: true,
                                        wrongLogin: 0,
                                        profile: profile
                                    })
                                })        
                                .catch((error) => {
                                    console.log('Something went wrong...');
                                });
                        }                                   
                    }
                }
                this.setState({
                    userId: undefined,
                    page: 0,
                    loggedIn: false,
                    wrongLogin: this.state.wrongLogin + 1
                });
            }
        }, 100);
    }

    register(email, password, firstname, lastname) {
        console.log('email: ', email);
        console.log('password: ', password);
        console.log('firstname: ', firstname);
        console.log('lastname: ', lastname);

        this.setState({
            page: 0,
            loggedIn: false,
            wrongLogin: 0,
            profile: undefined
        });
    }

    switchPage(number) {
        this.setState({page: number});
    }
    
    render() {
        let displayWrongLogin = this.state.wrongLogin > 1 ? 'block' : 'none';
        return(
            <div style={{
                width: '100%',
                minWidth: '300px',
                margin: '6px auto',
                maxHeight: '100vh',
                overflowY: 'hidden'
            }}>
                <div 
                    id="Container"
                    style={{
                        maxWidth: '1200px',
                        minWidth: '300px',
                        margin: '0 auto',
                        display: 'block',
                        height: '80vh',
                        overflowY: 'scroll'
                    }}> 
                    {this.state.profile ? 
                        <AppContent 
                            profile={this.state.profile}
                            usersUrl={this.state.usersUrl}
                            userId={this.state.userId}
                            login={(email, password) => this.login(email, password)}
                            logout={() => this.logout()}
                            loggedIn={this.state.loggedIn}
                            page={this.state.page} 
                            source="Mock Data" 
                            width={document.getElementById('Container')} />
                    : ''}
                    {this.state.page === 0 && !this.state.loggedIn ? 
                        <Login 
                            login={(email, password) => this.login(email, password)}
                            switchPage={(tab) => this.switchPage(4)}
                        />
                    : ''}
                    {this.state.page === 4 ? 
                        <Register 
                            register={(email, password, firstname, lastname) => this.register(email, password, firstname, lastname)}
                            switchPage={(tab) => this.switchPage(0)}
                        />
                    : ''}  
                    <p style={{
                        display: displayWrongLogin,
                        textAlign: 'center',
                        fontSize: '1.3em',
                        color: 'red'
                    }}>Wrong login ({this.state.wrongLogin})</p>
                </div>                
                {this.state.loggedIn ? 
                    <AppFooter 
                        switchPage={(number) => this.switchPage(number)} 
                        width={document.body.clientWidth} />
                : ''}
            </div>
        );
    }
}
