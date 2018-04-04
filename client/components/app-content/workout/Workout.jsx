import React from 'react';
import Radium from 'radium';

import Box from '../../box/Box.jsx';

class WorkoutComponent extends React.Component {
    constructor(props) {
        super(props);

        let types = [];
        for(let type in this.props.data) {
            types.push(type);
        }
        this.state = {
            tab: 1,
            pullup: this.props.data.pullup.values,
            pushup: this.props.data.pushup.values,
            situp: this.props.data.situp.values,
            squat: this.props.data.squat.values,
            running: this.props.data.running.values,
            weight: this.props.data.weight.values,
            types: types
        }
    }
    
    newWorkout(input, type) {
        if (input !== '') {
            let workout = this.state[type];
            let newWorkout = [{
                value: input,
                date: new Date().toISOString().substring(0, 10)
            }].concat(workout);
            this.setState({[type]: newWorkout});
        }
    }

    getRunningValue(distance, time, type) {
        if (distance !== '' && time !== '') {
            let targetDistance = 10;
            let modifier = 1.15;
            let input = Math.round(time * Math.pow((targetDistance / distance), modifier));
            this.newWorkout(input, type);
        }
    }

    render() {
        let icons = this.state.types.map((type, index) => {
            let Svg = this.props.svgs[type];
            return <span key={index + 1} 
                         onClick={() => this.setState({tab: index + 1})}>
                            <Svg 
                                width={100 / (this.state.types.length * 1.4) + 'vw'}
                                style={this.props.style.icon} />                            
                    </span>
        });  
        let box = this.state.types.map((type, index) => {
            if (this.state.tab === index + 1 && type !== 'running') {
                return <Box 
                            key={index + 1}
                            onClick={(input, workoutType) => this.newWorkout(input, type)}
                            header={this.props.data[type].header} 
                            type={this.props.data[type].type} 
                            placeholder={this.props.data[type].placeholder}
                            values={this.state[type]} />
            } else if (this.state.tab === index + 1 && type === 'running') {
                return <Box 
                            key={index + 1}
                            addRunningValue={(km, min, workoutType) => this.getRunningValue(km, min, type)}
                            header={this.props.data[type].header} 
                            type={this.props.data[type].type} 
                            placeholder={this.props.data[type].placeholder}
                            values={this.state[type]} />
            }
        });
        return (
            <div>
                <h1 style={this.props.style.textMargin}>Workouts</h1>
                <p style={this.props.style.headerMargin}>{icons}</p>
                {box}                
            </div>
        );
    }
}

export default Radium(WorkoutComponent);
