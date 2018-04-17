import React from 'react';
import Radium from 'radium';
import s from './new-value-style';

class NewRunningValue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <div style={{...this.props.boxStyle}}>
                <input id={this.props.id} type="number" style={{...s.smallInput, margin: '0 8px 0 0'}} placeholder="Distance (km)" />
                <input id={this.props.id + 1} type="number" style={s.smallInput} placeholder="Time (min)" />
                <input id={this.props.id + 2} type="number" style={s.smallInput} placeholder="Time (sec)" />
                <span 
                    style={s.add} 
                    onClick={() => this.props.addRunningValue(
                        document.getElementById(this.props.id).value, 
                        document.getElementById(this.props.id + 1).value,
                        document.getElementById(this.props.id + 2).value)}
                    >+</span>
            </div>
        );
    }
}

export default Radium(NewRunningValue);
