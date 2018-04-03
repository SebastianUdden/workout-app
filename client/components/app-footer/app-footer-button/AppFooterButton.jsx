import React from 'react';
import Radium from 'radium';

import s from './app-footer-button-style';
// import Overview from './overview/Overview.jsx';
class AppFooterButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={s.container} onClick={this.props.onClick}>
                
                <img style={s.image} src={"/images/" + this.props.icon + ".svg"} />
                <p style={s.text}>{this.props.icon}</p>
            </div>
        );
    }
}

export default Radium(AppFooterButton);

