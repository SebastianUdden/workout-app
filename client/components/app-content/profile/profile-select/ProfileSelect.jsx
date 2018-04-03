import React from 'react';
import Radium from 'radium';
import s from './profile-select-style';

class ProfileSelect extends React.Component {    
    render() {
        let options = [];
        for (let i = this.props.min; i < this.props.max; i++) {
            options.push(<option style={s.option} key={'id-' + i} value={i}>{i}</option>)
        }
        
        return (
            <select style={s.select} defaultValue={this.props.default}>                    
                {options}                
            </select>
        );
    }
}

export default Radium(ProfileSelect);