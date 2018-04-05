import React from 'react';
import Radium from 'radium';
import s from './value-point-style';

class ValueHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteButton: 'none',
            deleteWidth: 0
        }
    }

    showDeleteButton() {
        if (this.state.showDeleteButton === 'none') {
            this.setState({ showDeleteButton: 'inline', deleteWidth: 13 });
        } else {
            this.setState({ showDeleteButton: 'none', deleteWidth: 0 });
        }
    }
    
    render() {
        return (
            <g style={this.props.lastAdded ? s.currentBar : {}}>
                <text
                    onClick={(e, index) => this.props.deleteWorkout(e, index)}
                    style={{...s.text, display: this.state.showDeleteButton}}
                    width={this.state.deleteWidth - 10}
                    y={this.props.lastAdded ? this.props.y + 20: this.props.y + 44}
                    x={0}>x</text>
                <rect    
                    onClick={() => this.showDeleteButton()}
                    width={this.props.width} 
                    height={this.props.lastAdded ? 30 : 19}
                    y={this.props.lastAdded ? this.props.y : this.props.y + 30}
                    x={this.state.deleteWidth}></rect>
                <text 
                    onClick={() => this.showDeleteButton()}
                    key={this.props.value + this.props.date} 
                    style={s.text} 
                    x={this.state.deleteWidth + parseInt(this.props.width) + 10} 
                    y={this.props.lastAdded ? this.props.y + 14 : this.props.y + 39}
                    dy=".35em">{this.props.value} {this.props.type} - <tspan style={s.date}>{this.props.date}</tspan></text>                
            </g>
        );
    }
}

export default Radium(ValueHistory);
