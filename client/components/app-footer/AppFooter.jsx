import React from 'react';
import Radium from 'radium';
import s from './app-footer-style';

import AppFooterButton from './app-footer-button/AppFooterButton.jsx';

class AppFooter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onClick(number) {
        this.props.switchPage(number);
    }

    render() {
        let color = '#030104';
        return (
            <div style={s.container}>
                <AppFooterButton color={color} width={this.props.width} icon="Workout" onClick={() => this.onClick(1)} />
                <AppFooterButton color={color} width={this.props.width} icon="Profile" onClick={() => this.onClick(2)} />
                <AppFooterButton color={color} width={this.props.width} icon="Overview" onClick={() => this.onClick(3)} />
            </div>
        );
    }
}

export default Radium(AppFooter);