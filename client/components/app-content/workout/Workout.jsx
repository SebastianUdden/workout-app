import React from 'react';
import Radium from 'radium';

import Box from '../../box/Box.jsx';

class WorkoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
            workouts: undefined
        };
    }

    componentDidMount() {
        let tab = parseInt(localStorage.getItem( 'currentTab' )) || 1;
        this.setState({tab: tab});
    }
    
    setTab(tab) {
        this.setState({tab: tab});
        localStorage.setItem( 'currentTab', tab );
    }

    newWorkout(input, name, values) {
        if (input !== '' && this.props.profile.workouts) {  
            let today = new Date().toISOString().substring(0, 10);          
            let workouts = this.props.profile.workouts;
            workouts.map((workout) => {
                if (workout.name === name && 
                    workout.values.filter(value => (value.date === today)).length > 0) {
                        workout.values.map((v) => {
                            if (v.date === today) {
                                v.value = parseInt(input);
                            }
                        });
                } else if (workout.name === name) {
                    workout.values.unshift({
                        value: parseInt(input),
                        date: today
                    });
                }                         
            });
            this.setState({ workouts: workouts });            
            this.api('PUT', this.props.url, {
                "workouts": workouts
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));
            
            let profile = this.props.profile;
            profile.workouts = workouts;
            this.props.saveProfile(profile);
        }
    }

    getRunningValue(km, min, sec, values) {
        if (km !== '' && min !== '' && min !== '') {
            let time = parseInt(min) + parseInt(sec) / 60; 
            let targetKm = 10;
            let modifier = 1.15;
            let input = Math.round((time * Math.pow((targetKm / km), modifier)) * 100) / 100;
            console.log('input: ', input);
            this.newWorkout(input, 'running', values);
        }
    }

    deleteWorkout(event, index, workoutIndex) {
        event.preventDefault();
        if (this.props.profile.workouts) {
            let workouts = this.props.profile.workouts;
            workouts[workoutIndex].values.splice(index, 1);
            this.setState({ workouts: workouts });            
            this.api('PUT', this.props.url, {
                "workouts": workouts
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    }

    api(type, url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            method: type,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => response.json());
    }

    render() {
        let icons = [];
        let workouts; 
        if (this.state.workouts) {
            workouts = this.state.workouts;
        } else if (this.props.profile) {
            workouts = this.props.profile.workouts;
        }
        let box = workouts ? this.props.profile.workouts.map((workout, index) => {            
            let Svg = this.props.svgs[workout.name];
            icons.push(
                <span 
                    key={index + 1} 
                    onClick={() => this.setTab(index + 1)}>
                    <Svg 
                        width={100 / (this.props.profile.workouts.length * 1.4) + '%'}
                        style={this.props.style.icon} />                            
                </span>);
            if (this.state.tab === index + 1 && workout.name !== 'running') {
                let workoutname = workout.name !== 'weight' ? workout.name : 'targetWeight';
                return <Box 
                            key={index + 1}
                            addWorkout={(input, workoutValues) => this.newWorkout(input, workout.name, workout.values)}
                            deleteWorkout={(e, i, wi) => this.deleteWorkout(e, i, index)}
                            header={workout.header} 
                            type={workout.type} 
                            placeholder={workout.placeholder}
                            values={workout.values} />
            } else if (this.state.tab === index + 1 && workout.name === 'running') {
                return <Box 
                            key={index + 1}
                            addRunningValue={(km, min, sec, workoutValues) => this.getRunningValue(km, min, sec, workout.values)}
                            deleteWorkout={(e, i, wi) => this.deleteWorkout(e, i, index)}
                            header={workout.header} 
                            type={workout.type} 
                            placeholder={workout.placeholder}
                            values={workout.values} />
            }
        }) : '';
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
