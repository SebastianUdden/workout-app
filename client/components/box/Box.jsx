import React from 'react';
import Radium from 'radium';
import s from './box-style';

import CurrentValue from './current-value/CurrentValue.jsx';
import NewValue from './new-value/NewValue.jsx';
import NewRunningValue from './new-value/NewRunningValue.jsx';
import ValueHistory from './value-history/ValueHistory.jsx';

class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let currentValue = this.props.values[0];
        let maxValue = Math.max.apply(
            Math, 
            this.props.values.map((v) => { 
                return v.value; 
        }));        

        return (
            <div style={s.container}>
                <h1 style={s.header}>{this.props.header}</h1>
                <hr />
                {this.props.header === 'Running (est. 10km)' ? 
                    <div>
                        <NewRunningValue
                            id="1"                             
                            boxStyle={s.instance}
                            addRunningValue={(km, min) => this.props.addRunningValue(km, min)} />                        
                    </div>
                :
                    <div>
                        <NewValue 
                            id="1" 
                            placeholder={this.props.placeholder} 
                            boxStyle={s.instance}
                            onClick={(input) => this.props.onClick(input)} />                        
                    </div>
                }
                <CurrentValue 
                    value={currentValue.value} 
                    max={maxValue}
                    date={monthNames[parseInt(currentValue.date.split('-')[1]  - 1)] + ' ' + parseInt(currentValue.date.split('-')[2])} 
                    type={this.props.type} 
                    boxStyle={s.instance} />
                <ValueHistory 
                    type={this.props.type}
                    valueHistory={this.props.values}
                    max={maxValue}
                    boxStyle={s.instance} />
            </div>
        );
    }
}

export default Radium(Box);
