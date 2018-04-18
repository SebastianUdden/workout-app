import React from 'react';
import Radium from 'radium';

import s from './app-footer-button-style';
import Workout from '../../svgs/WorkoutSVG.jsx';
import Profile from '../../svgs/ProfileSVG.jsx';
import Overview from '../../svgs/OverviewSVG.jsx';

class AppFooterButton extends React.Component {
    constructor(props) {
        super(props); 
    }

    render() {        
        let svgWidth = '30%';
        return (
            <div id={this.props.icon} style={s.container} onClick={this.props.onClick}>                
                {this.props.icon === 'Workout' ? <Workout width={svgWidth} color={this.props.color} /> : ''}
                {this.props.icon === 'Profile' ? <Profile width={svgWidth} color={this.props.color} /> : ''}
                {this.props.icon === 'Overview' ? <Overview width={svgWidth} color={this.props.color} /> : ''}
                {this.props.width > 300 &&  this.props.width < 1000 ? 
                    <p style={{fontSize: 'calc(1.5em - 0.8vw)', color: this.props.color}}>{this.props.icon}</p>
                : ''}
            </div>
        );
    }
}

export default Radium(AppFooterButton);
