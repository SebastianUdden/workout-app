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
        let targetTypes = [
            {
                type: 'pullup',
                text: 'pull-ups',
                min: '0',
                max: '100'
            },
            {
                type: 'pushup',
                text: 'push-ups',
                min: '0',
                max: '200'
            },
            {
                type: 'running',
                text: 'min (10 km)',
                min: '0',
                max: '100'
            },
            {
                type: 'situp',
                text: 'sit-ups',
                min: '0',
                max: '300'
            },
            {
                type: 'squat',
                text: 'squats',
                min: '0',
                max: '300'
            },
            {
                type: 'targetWeight',
                text: 'kg',
                min: '0',
                max: '150'
            }
        ];
               
        return (
            <div>
                <h1 style={sp.textMargin}>Profile</h1>
                <p style={sp.headerMargin}>{this.props.profile.firstname} {this.props.profile.lastname}</p>
                
                {this.props.profile.height ? 
                    <div>
                        <h3 style={sp.textMargin}>Height</h3>
                        <ProfileSelect 
                            text="cm"
                            margin={sp.textMargin}
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='240' 
                            type='height'
                            default={this.props.profile.height} />
                    </div> 
                : ''}                
                {this.state.weight > -1 ? 
                    <div>
                        <h3 style={sp.textMargin}>Weight</h3>
                        <p style={sp.textMargin}>{this.state.weight} kg</p>
                    </div>
                : ''}
                {this.props.profile.bodyFat ? 
                    <div>
                        <h3 style={sp.textMargin}>Body Fat</h3>
                        <ProfileSelect 
                            text="%"
                            margin={sp.textMargin}
                            updateTargets={(type, targets) => this.updateTargets(type, targets)}
                            url={this.props.url}
                            min='0'
                            max='50' 
                            type='bodyFat'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.bodyFat} /> 
                    </div>
                : ''}        

                <h3 style={sp.subHeaderMargin}>Target Values</h3>
                {targetTypes.map((target) => {
                    if (this.props.profile.targets[target.type]) {
                        return <ProfileSelect 
                                    key={target.type}
                                    text={target.text}
                                    margin={sp.textMargin}
                                    updateTargets={(type, targets) => this.updateTargets(type, targets)}
                                    url={this.props.url}
                                    min={target.min}
                                    max={target.max}
                                    type={target.type}
                                    targets={this.props.profile.targets} 
                                    default={this.props.profile.targets[target.type]} />
                        }
                    }
                )}          
                <button 
                    style={s.logoutButton}
                    onClick={() => this.props.logout()}>Logout</button>
            </div>
        );
    }
}

export default Radium(profile);
