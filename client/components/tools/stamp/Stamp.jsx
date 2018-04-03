import React from 'react';
import Radium from 'radium';
import s from './stamp-style';

class Stamp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let c = this.props.color;
        return (
            <div style={s.container}>        
                <span style={{
                    ...s.span, 
                    zIndex: this.props.onTop ? 100 : -100,
                    top: this.props.yPercentage + 'vh',
                    left: this.props.xPercentage + 'vw',
                    fontSize: this.props.size + 'vw',                    
                    padding: this.props.size / 1.5 + 'vw',
                    color: 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')', 
                    boxShadow: 'inset 0px 0px 0px ' + this.props.size / 5 + 'vw ' + 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')',
                    transform: 'rotate(' + this.props.rotation + 'deg)'
                }}>{this.props.text}</span>
            </div>
        );
    }
}

export default Radium(Stamp);