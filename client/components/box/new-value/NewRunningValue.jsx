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
                <input id={this.props.id} type="number" style={{...s.smallInput, margin: '0 8px 0 0'}} placeholder="Km" />
                <input id={this.props.id + 1} type="number" style={{...s.smallInput, margin: '0 8px 0 0'}} placeholder="Min" />
                <input id={this.props.id + 2} type="number" style={s.smallInput} placeholder="Sec" />
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
