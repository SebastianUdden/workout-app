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
        return (
            <div style={s.container}>
                <AppFooterButton icon="Workouts" onClick={() => this.onClick(1)} />
                <AppFooterButton icon="Profile" onClick={() => this.onClick(2)} />
                <AppFooterButton icon="Overview" onClick={() => this.onClick(3)} />
            </div>
        );
    }
}

export default Radium(AppFooter);