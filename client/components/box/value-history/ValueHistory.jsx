import React from 'react';
import Radium from 'radium';
import s from './value-history-style';

import ValuePoint from './value-point/ValuePoint.jsx';

class ValueHistory extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        return (
            <div style={this.props.boxStyle}>
                <svg 
                    style={s.chart} 
                    height="250" 
                    aria-labelledby="title desc" 
                    role="img">
                    <title id="title">A chart showing information</title>
                    {this.props.valueHistory.map((point, index) => {
                        if (index !== 0 && index < 11) {
                            return <ValuePoint 
                                        key={index} 
                                        value={point.value}
                                        width={(point.value / this.props.max) * 120}
                                        date={monthNames[parseInt(point.date.split('-')[1] - 1)] + ' ' + parseInt(point.date.split('-')[2])} 
                                        type={this.props.type}
                                        y={20 * index} />
                        }
                    })}                                   
                </svg>
            </div>
        );
    }
}

export default Radium(ValueHistory);
