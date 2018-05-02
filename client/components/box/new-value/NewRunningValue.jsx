import React from 'react';
import Radium from 'radium';
import s from './new-value-style';

import Timer from '../../tools/timer/Timer.jsx';
class NewRunningValue extends React.Component {
    constructor(props) {
        super(props);
    }

    saveTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.getElementById(this.props.id + 1).value = time > 59 
            ? minutes
            : 0;
        document.getElementById(this.props.id + 2).value = seconds;
    }

    render() {        
        return (
            <div style={{...this.props.boxStyle}}>
                <Timer 
                    color='#da8353' 
                    saveTime={(time) => this.saveTime(time)} />
                <input id={this.props.id} type="number" style={{...s.smallInput, margin: '0 8px 0 0'}} placeholder="Km" />
                <input id={this.props.id + 1} type="number" style={{...s.smallInput, margin: '0 8px 0 0'}} placeholder="Min" />
                <input id={this.props.id + 2} type="number" style={s.smallInput} placeholder="Sec" />
                <span 
                    id="Add"
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
