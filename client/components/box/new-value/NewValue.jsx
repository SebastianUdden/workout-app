import React from 'react';
import Radium from 'radium';
import s from './new-value-style';

class NewValue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <div style={this.props.boxStyle}>
                <input id={this.props.id} type="number" style={s.input} placeholder={this.props.placeholder} />
                <span id="Add" style={s.add} onClick={() => this.props.onClick(document.getElementById(this.props.id).value)}>+</span>
            </div>
        );
    }
}

export default Radium(NewValue);
