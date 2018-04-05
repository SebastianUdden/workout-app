import React from 'react';
import Radium from 'radium';
import s from './profile-style';

import ProfileSelect from './profile-select/ProfileSelect.jsx';

class profile extends React.Component {
    constructor(props) {
        super(props);
    }

    updateValue(type) {
        switch(type) {
            case 'Height':
                break;
            case 'Weight':
                break;
            case 'Body Fat':
                break;
        }
    }
    
    render() {
        let sp = this.props.style;        

        return (
            <div>
                <h1 style={sp.textMargin}>Profile</h1>
                <p style={sp.headerMargin}>{this.props.profile.name}</p>
                
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
                            max='1000' 
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
                            max='1000' 
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
                            max='1000' 
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
                            max='1000' 
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
                            max='1000' 
                            type='squat'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.squat} /> : ''}
                    squats
                </p>
                <p style={sp.textMargin}>
                    {this.props.profile.targets.squat ? 
                        <ProfileSelect 
                            url={this.props.url}
                            min='0'
                            max='1000' 
                            type='targetWeight'
                            targets={this.props.profile.targets} 
                            default={this.props.profile.targets.targetWeight} /> : ''}
                    kg
                </p>
            </div>
        );
    }
}

export default Radium(profile);