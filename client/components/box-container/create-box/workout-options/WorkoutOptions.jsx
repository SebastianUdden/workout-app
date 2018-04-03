import React from 'react';
import Radium from 'radium';

import s from './workout-options-style';

class WorkoutOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <select>
                {this.props.options.map((option) => {
                    return <option>{option}</option>
                })}
            </select>
        )
    }
}

export default Radium(WorkoutOptions);