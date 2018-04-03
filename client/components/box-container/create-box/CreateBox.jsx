import React from 'react';
import Radium from 'radium';
import s from '../../box/box-style';

import NewValue from '../../box/new-value/NewValue.jsx';
import WorkoutOptions from './workout-options/WorkoutOptions.jsx';

class BoxContainer extends React.Component {
    render() {
        let options = [
            'Running',
            'Push-Ups',
            'Sit-Ups',
        ];
        return (
            <div style={s.container}>
                <h1 style={s.header}><span style={s.add}>+</span> Add workout</h1>                
                <WorkoutOptions options={options} />
                <NewValue boxStyle={s.instance} />
            </div>
        );
    }
}

export default Radium(BoxContainer);