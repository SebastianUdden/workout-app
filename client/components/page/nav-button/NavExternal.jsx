import React from 'react';
import styles from './nav-button-styles';
import Radium from 'radium';

class NavExternal extends React.Component {
    constructor(props) {
        super(props);        
    };

    showMenu(bool, e) {
        e.preventDefault();
        this.props.showMenu(bool, e);
    }

    render() {
        return (
            <a 
                href={this.props.externalRef.uri} 
                target="_blank" 
                style={styles.menuItem}>
                    {this.props.externalRef.name}
            </a>

        );
    }
}

export default Radium(NavExternal);