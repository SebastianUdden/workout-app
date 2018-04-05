import React from 'react';
import Radium from 'radium';
import s from './overview-style';

import Graph from '../../graph/Graph.jsx';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1
        }
    }    

    render() {
        let icons = [];
        let graph = this.props.profile ? this.props.profile.workouts.map((workout, index) => {
            let Svg = this.props.svgs[workout.name];
            icons.push(
                <span 
                    key={index + 1}
                    onClick={() => this.setState({tab: index + 1})}>
                    <Svg 
                        width={100 / (this.props.profile.workouts.length * 1.4) + '%'}
                        style={this.props.style.icon} />                            
                </span>);
            if (this.state.tab === index + 1) {
                let workoutname = workout.name !== 'weight' ? workout.name : 'targetWeight';
                return <Graph 
                            key={index + 1}
                            header={workout.header} 
                            height={document.documentElement.clientHeight * 0.5}
                            width={document.documentElement.clientWidth * 0.8}
                            highTarget={workout.highTarget}
                            values={workout.values}
                            target={parseInt(this.props.profile.targets[workoutname])}
                            />
            }
        }) : '';
        return (
            <div>
                <h1 style={this.props.style.textMargin}>Overview</h1>
                <p style={this.props.style.headerMargin}>
                    {icons}
                </p>
                {graph}                
            </div>
        );
    }
}

export default Radium(Overview);
