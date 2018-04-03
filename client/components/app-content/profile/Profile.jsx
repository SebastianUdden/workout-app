import React from 'react';
import Radium from 'radium';
import s from './profile-style';

import ProfileSelect from './profile-select/ProfileSelect.jsx';
import defaultProfile from '../../../mock-data/defaultProfile.js';

class profile extends React.Component {
    constructor(props) {
        super(props);
    }

    updateValue(type) {
        console.log(type);
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
                <p style={sp.headerMargin}>{defaultProfile.name}</p>
                
                <h3 style={sp.textMargin}>Height</h3>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="240" default={defaultProfile.height} />
                    cm
                </p>

                <h3 style={sp.textMargin}>Weight</h3>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="200" default={defaultProfile.weight} />
                    kg
                </p>
                
                <h3 style={sp.textMargin}>Body Fat</h3>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="50" default={defaultProfile.bodyFat} />                    
                    %
                </p>

                <h3 style={sp.subHeaderMargin}>Target Values</h3>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="1000" default={defaultProfile.targets.pullups} />
                    pull-ups
                </p>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="1000" default={defaultProfile.targets.pushups} />
                    push-ups
                </p>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="1000" default={defaultProfile.targets.running} />
                    min (10 km)
                </p>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="1000" default={defaultProfile.targets.situps} />
                    sit-ups
                </p>
                <p style={sp.textMargin}>
                    <ProfileSelect min="0" max="1000" default={defaultProfile.targets.squats} />
                    squats
                </p>
            </div>
        );
    }
}

export default Radium(profile);