import React from 'react';
import Radium from 'radium';
import s from './profile-style';

import ProfileSelect from './profile-select/ProfileSelect.jsx';

class profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workouts: this.props.profile.workouts,
            weight: -1
        };
    }

    componentDidMount() {
        if (this.state.workouts) {
            this.state.workouts.map((workout) => {
                if (workout.name === 'weight' && workout.values.length > 0) {
                    this.setState({weight: workout.values[0].value})
                }
            });
        }
    }

    updateTargets(type, targets) {
        console.log('targets: ', targets);
        this.putData(this.props.url, {
                [type]: document.getElementById(type  + 'ID').value,
                "targets": targets
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));

        let profile = this.props.profile;
        profile.targets = targets;
        this.props.saveProfile(profile);
    }
    
    putData(url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => response.json())
    }

    render() {
        let sp = this.props.style;        

        return (
            <div>
                <h1 style={sp.textMargin}>Profile</h1>
                <p style={sp.headerMargin}>{this.props.profile.firstname} {this.props.profile.lastname}</p>
                
                <h3 style={sp.textMargin}>Height</h3>
                <p style={sp.textMargin}>
                    {this.props.profile.height ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='240' 
                            type='height'
                            default={this.props.profile.height} /> : ''}
                    cm
                </p>
                {this.state.weight > -1 ? 
                    <div>
                        <h3 style={sp.textMargin}>Weight</h3>
                        <p style={sp.textMargin}>{this.state.weight} kg</p>
                    </div>
                : ''}
                <h3 style={sp.textMargin}>Body Fat</h3>
                <p style={sp.textMargin}>
                    {this.props.profile.bodyFat ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='50' 
                            type='bodyFat'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.bodyFat} /> : ''}        
                    %
                </p>
                <h3 style={sp.subHeaderMargin}>Target Values</h3>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.pullup ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='100'
                            type='pullup'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.pullup} /> : ''}
                    pull-ups
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.pushup ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='200' 
                            type='pushup'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.pushup} /> : ''}
                    push-ups
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.running ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='100' 
                            type='running'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.running} /> : ''}
                    min (10 km)
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.situp ? 
                        <ProfileSelect  
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='200' 
                            type='situp'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.situp} /> : ''}
                    sit-ups
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.squat ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='300' 
                            type='squat'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.squat} /> : ''}
                    squats
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.targetWeight ? 
                        <ProfileSelect 
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='150'
                            type='targetWeight'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.targetWeight} /> : ''}
                    kg
                </p>
                <button 
                    style={s.logoutButton}
                    onClick={() => this.props.logout()}>Logout</button>
            </div>
        );
    }
}

export default Radium(profile);
