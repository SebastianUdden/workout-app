import React from 'react';
import BoxContainer from './box-container/BoxContainer.jsx';

import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import AppContent from './app-content/AppContent.jsx';
import AppFooter from './app-footer/AppFooter.jsx';
import s from './app-style';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        let backEndUrl = 'https://arcane-journey-35345.herokuapp.com';
        // let backEndUrl = 'http://localhost:3005';
        let page = localStorage.getItem( 'currentPage' ) || 0;
        let loggedIn = localStorage.getItem( 'loggedIn' ) || false;
        let profile = JSON.parse(localStorage.getItem( 'profile' )) || undefined;

        this.state = {
            usersUrl: backEndUrl + '/api/users/',
            registryUrl: backEndUrl + '/api/registry/users/',
            registry: undefined,
            userId: undefined,
            profile: profile,
            page: page,
            loggedIn: loggedIn,
            wrongLogin: 0
        };
    }

    logout() {
        this.switchPage(0);
        this.saveLoggedIn(false);
        this.saveProfile(undefined);
        this.setState({            
            wrongLogin: 0,
        });
        localStorage.clear();
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
                        this.switchPage(0);
                        this.setState({
                            userId: user.userModelId,
                            wrongLogin: 0
                        });
                        this.saveLoggedIn(false);
                        if (this.state.userId) {
                            fetch(this.state.usersUrl + this.state.userId)
                                .then((data) => data.json())
                                .then((data) => {                                    
                                    let profile = data;
                                    this.setState({
                                        userId: user.userModelId,                                        
                                        wrongLogin: 0                                        
                                    });
                                    this.saveProfile(profile);
                                    this.saveLoggedIn(true);
                                    this.switchPage(1);
                                })        
                                .catch((error) => {
                                    console.log('Something went wrong...');
                                });
                        }                                   
                    }
                }
                this.setState({
                    userId: undefined,
                    wrongLogin: this.state.wrongLogin + 1
                });
                this.saveLoggedIn(false);
                this.switchPage(0);
            }
        }, 100);
    }

    register(firstname, lastname, email, password) {
        let user = {
            'email': email,
            'password': password,
            'firstname': firstname,
            'lastname': lastname,
            'height': 180,  
            'bodyFat': 25,
            'targets': {
                'pullup': 10,
                'pushup': 10,
                'running': 10,
                'situp': 10,
                'squat': 10,
                'targetWeight': 80
            },
            'workouts': [
                {
                    'name': 'pullup',
                    'header': 'Pull-Ups',
                    'type': 'rep',
                    'placeholder': 'Pull-ups completed',
                    'highTarget': 'true',
                    'values': []
                },
                {
                    'name': 'pushup',
                    'header': 'Push-Ups',
                    'type': 'rep',
                    'placeholder': 'Push-ups completed',
                    'highTarget': 'true',
                    'values': []
                },
                {
                    'name': 'situp',
                    'header': 'Sit-Ups',
                    'type': 'rep',
                    'placeholder': 'Sit-ups completed',
                    'highTarget': 'true',
                    'values': []
                },
                {
                    'name': 'squat',
                    'header': 'Squats',
                    'type': 'rep',
                    'placeholder': 'Squats completed',
                    'highTarget': 'true',
                    'values': []
                },
                {
                    'name': 'running',
                    'header': 'Running (est. 10km)',
                    'type': 'min',                    
                    'highTarget': 'false',
                    'values': []
                },
                {
                    'name': 'weight',
                    'header': 'Weight',
                    'type': 'kg',
                    'placeholder': 'Current weight',
                    'highTarget': 'false',
                    'values': []
                }
            ]
        }

        this.api('POST', this.state.usersUrl, user)
            .then(data => console.log(data))
            .then(() => {
                this.api('GET', this.state.usersUrl)
                    .then(data => {
                        for(let i = 0; i < data.length; i++) {
                            if (data[i].email === user.email) {
                                let registryUser = {
                                    'email': user.email,
                                    'password': user.password,
                                    'userModelId': data[i]._id
                                };
                                this.api('POST', this.state.registryUrl, registryUser)
                                    .then(data => console.log(data))
                                    .catch(error => console.error(error));
                            }
                        }
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        

        this.setState({
            wrongLogin: 0
        });
        this.saveProfile(undefined);
        this.saveLoggedIn(false);
        this.switchPage(0);
    }

    api(type, url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            method: type,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => response.json());
    }

    switchPage(number) {
        this.setState({page: number});
        localStorage.setItem( 'currentPage', number );
    }

    saveLoggedIn(loggedIn) {
        this.setState({loggedIn: loggedIn});
        localStorage.setItem( 'loggedIn', loggedIn );
    }

    saveProfile(profile) {
        this.setState({profile: profile});
        localStorage.setItem( 'profile', JSON.stringify(profile));
    }
    
    render() {
        let displayWrongLogin = this.state.wrongLogin > 1 ? 'block' : 'none';
        return(
            <div style={s.app}>
                <div 
                    id="Container"
                    style={s.container}> 
                    {this.state.profile && this.state.page && this.state.loggedIn ? 
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
                            register={(firstname, lastname, email, password) => this.register(firstname, lastname, email, password)}
                            switchPage={(tab) => this.switchPage(0)}
                        />
                    : ''}  
                    <p style={{...s.error, display: displayWrongLogin}}>Wrong login ({this.state.wrongLogin})</p>
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
