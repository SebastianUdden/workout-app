import React from 'react';
import Radium from 'radium';
import s from './current-value-style';

class CurrentValue extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {        
        return (
            <div style={this.props.boxStyle}>
                <svg style={s.chart} aria-labelledby="title desc" role="img">
                    <title id="title">A bar displaying current value</title>
                    <g style={s.bar}>
                        <rect width={(this.props.value / this.props.max) * 120} height="32" y="12"></rect>
                        <text 
                            x={parseInt((this.props.value / this.props.max) * 120) + 10} 
                            y="27" 
                            dy=".35em">{this.props.value} {this.props.type} - <tspan style={s.date}>{this.props.date}</tspan></text>
                    </g>                               
                </svg>
            </div>
        );
    }
}

export default Radium(CurrentValue);

// <h1>{this.props.value} {this.props.type}</h1>
