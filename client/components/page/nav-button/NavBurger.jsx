import React from 'react';
import styles from './nav-button-styles';
import Radium from 'radium';

class NavBurger extends React.Component {
    constructor(props) {
        super(props);        
    };

    showMenu(bool, e) {
        e.preventDefault();
        this.props.showMenu(bool, e);
    }

    render() {
        let icon = {
            display: this.props.display,
            position: this.props.position,
            top: '2vw',
            right: 0
        };
        return (
            <a 
                href="#" 
                style={{...icon, ...styles.menuItem}}
                onClick={(e) => this.showMenu(false, e)}>
                    &#9776;
            </a>
        );
    }
}

export default Radium(NavBurger);