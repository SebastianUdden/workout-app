import React from 'react';
import Radium from 'radium';
import s from './value-point-style';

class ValueHistory extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <g style={s.bar}>
                <rect 
                    width={this.props.width} 
                    height="19" y={this.props.y}></rect>
                <text 
                    key={this.props.value + this.props.date} 
                    style={s.text} 
                    x={parseInt(this.props.width) + 10} y={parseInt(this.props.y) + 8} dy=".35em">{this.props.value} {this.props.type} - <tspan style={s.date}>{this.props.date}</tspan></text>
            </g>
        );
    }
}

export default Radium(ValueHistory);
