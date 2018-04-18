import React from 'react';
import Radium from 'radium';
import styles from './single-container-styles';

class SingleContainer extends React.Component {
    render() {
        return (
            <div style={styles}>
            </div>
        );
    }
}; 

export default Radium(SingleContainer);