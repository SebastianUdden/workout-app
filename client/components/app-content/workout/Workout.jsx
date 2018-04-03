import React from 'react';
import Radium from 'radium';
import s from './workout-style';

import Box from '../../box/Box.jsx';
import pullups from '../../../mock-data/pullups';
import pushups from '../../../mock-data/pushups';
import situps from '../../../mock-data/situps';
import squats from '../../../mock-data/squats';
import running from '../../../mock-data/running';
import weight from '../../../mock-data/weight';

class WorkoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
            pullupValues: pullups.values,
            pushupValues: pushups.values,
            situpValues: situps.values,
            squatValues: squats.values,
            runningValues: running.values,
            weightValues: weight.values,
        }
    }
    
    newWorkout(input, type) {
        if (input !== '') {
            let workOutValues = this.state[type + 'Values'];
            let newWorkoutValues = [{
                value: input,
                date: new Date().toISOString().substring(0, 10)
            }].concat(workOutValues);
            this.setState({[type + 'Values']: newWorkoutValues});
        }
    }

    newRunningWorkout(distance, time, type) {
        if (distance !== '' && time !== '') {
            let workOutValues = this.state[type + 'Values'];
            let targetDistance = 10;
            let modifier = 1.15;
            
            let newWorkoutValues = [{
                value: Math.round(time * Math.pow((targetDistance / distance), modifier)),
                date: new Date().toISOString().substring(0, 10)
            }].concat(workOutValues);
            this.setState({[type + 'Values']: newWorkoutValues});
        }
    }

    render() {
        let sp = this.props.style;
        return (
            <div>
                <h1 style={sp.textMargin}>Workouts</h1>
                <p style={sp.headerMargin}>
                    <span onClick={() => this.setState({tab: 1})}><img key="1" style={s.icon} src="/images/pushup.svg" alt="Push-Ups" /></span>                
                    <span onClick={() => this.setState({tab: 2})}><img key="2" style={s.icon} src="/images/situp.svg" alt="Sit-Ups" /></span>
                    <span onClick={() => this.setState({tab: 3})}><img key="3" style={s.icon} src="/images/pullup.svg" alt="Pull-Ups" /></span>
                    <span onClick={() => this.setState({tab: 4})}><img key="4" style={s.icon} src="/images/squats.svg" alt="Squats" /></span>
                    <span onClick={() => this.setState({tab: 5})}><img key="5" style={s.icon} src="/images/running.svg" alt="Running" /></span>
                    <span onClick={() => this.setState({tab: 6})}><img key="6" style={s.icon} src="/images/weight.svg" alt="Weight" /></span>
                </p>
                {this.state.tab === 1 ? 
                    <Box 
                        onClick={(input, type) => this.newWorkout(input, 'pushup')}
                        header={pushups.header} 
                        type={pushups.type} 
                        placeholder={pushups.placeholder}
                        values={this.state.pushupValues} />
                : ''}
                {this.state.tab === 2 ? 
                    <Box 
                        onClick={(input, type) => this.newWorkout(input, 'situp')}
                        header={situps.header} 
                        type={situps.type} 
                        placeholder={situps.placeholder}
                        values={this.state.situpValues} />
                : ''}
                {this.state.tab === 3 ? 
                    <Box 
                        onClick={(input, type) => this.newWorkout(input, 'pullup')}
                        header={pullups.header} 
                        type={pullups.type} 
                        placeholder={pullups.placeholder}
                        values={this.state.pullupValues} />
                : ''}
                {this.state.tab === 4 ? 
                    <Box 
                        onClick={(input, type) => this.newWorkout(input, 'squat')}
                        header={squats.header} 
                        type={squats.type} 
                        placeholder={squats.placeholder}
                        values={this.state.squatValues} />
                : ''}
                {this.state.tab === 5 ? 
                    <Box 
                        addRunningValue={(distance, time, type) => this.newRunningWorkout(distance, time, 'running')}
                        header={running.header} 
                        type={running.type} 
                        placeholder={running.placeholder}
                        values={this.state.runningValues} />
                : ''}
                {this.state.tab === 6 ? 
                    <Box 
                        onClick={(input, type) => this.newWorkout(input, 'weight')}
                        header={weight.header} 
                        type={weight.type} 
                        placeholder={weight.placeholder}
                        values={this.state.weightValues} />
                : ''}
            </div>
        );
    }
}

export default Radium(WorkoutComponent);