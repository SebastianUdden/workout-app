import React from 'react';
import Radium from 'radium';
import s from './profile-style';

import ProfileSelect from './profile-select/ProfileSelect.jsx';

class profile extends React.Component {
    constructor(props) {
        super(props);
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
                            url={this.props.url}
                            min='0'
                            max='240' 
                            type='height'
                            default={this.props.profile.height} /> : ''}
                    cm
                </p>
                <h3 style={sp.textMargin}>Weight</h3>
                <p style={sp.textMargin}>
                    {this.props.profile.weight ? 
                        <ProfileSelect 
                            url={this.props.url}
                            min='0'
                            max='200' 
                            type='weight'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.weight} /> : ''}
                    kg
                </p>
                <h3 style={sp.textMargin}>Body Fat</h3>
                <p style={sp.textMargin}>
                    {this.props.profile.bodyFat ? 
                        <ProfileSelect 
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
