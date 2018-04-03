import React from 'react';
import Radium from 'radium';
import s from './overview-style';

import Graph from './graph/Graph.jsx';
import pushups from '../../../mock-data/pushups';
import situps from '../../../mock-data/situps';
import pullups from '../../../mock-data/pullups';
import squats from '../../../mock-data/squats';
import running from '../../../mock-data/running';
import weight from '../../../mock-data/weight';
import defaultProfile from '../../../mock-data/defaultProfile';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 6
        }
    }    

    render() {        
        let sp = this.props.style;
        return (
            <div>
                <h1 style={sp.textMargin}>Overview</h1>
                <p style={sp.headerMargin}>
                    <span onClick={() => this.setState({tab: 1})}><img key="1" style={s.icon} src="/images/pushup.svg" alt="Push-Ups" /></span>                
                    <span onClick={() => this.setState({tab: 2})}><img key="2" style={s.icon} src="/images/situp.svg" alt="Sit-Ups" /></span>
                    <span onClick={() => this.setState({tab: 3})}><img key="3" style={s.icon} src="/images/pullup.svg" alt="Pull-Ups" /></span>
                    <span onClick={() => this.setState({tab: 4})}><img key="4" style={s.icon} src="/images/squats.svg" alt="Squats" /></span>
                    <span onClick={() => this.setState({tab: 5})}><img key="5" style={s.icon} src="/images/running.svg" alt="Running" /></span>
                    <span onClick={() => this.setState({tab: 6})}><img key="6" style={s.icon} src="/images/weight.svg" alt="Weight" /></span>
                </p>
                {this.state.tab === 1 ? 
                    <Graph 
                        header={pushups.header} 
                        height="300"
                        width="300"
                        values={pushups.values}
                        target={defaultProfile.targets.pushups}
                        />
                    : ''}
                {this.state.tab === 2 ? 
                    <Graph 
                        header={situps.header} 
                        height="300"
                        width="300"
                        values={situps.values}
                        target={defaultProfile.targets.situps}
                        />
                    : ''}
                {this.state.tab === 3 ? 
                    <Graph 
                        header={pullups.header} 
                        height="300"
                        width="300"
                        values={pullups.values}
                        target={defaultProfile.targets.pullups}
                        />
                    : ''}
                {this.state.tab === 4 ? 
                    <Graph 
                        header={squats.header} 
                        height="300"
                        width="300"
                        values={squats.values}
                        target={defaultProfile.targets.squats}
                        />
                    : ''}
                {this.state.tab === 5 ? 
                    <Graph 
                        header={running.header} 
                        height="300"
                        width="300"
                        values={running.values}
                        target={defaultProfile.targets.running}
                        />
                    : ''}
                {this.state.tab === 6 ? 
                    <Graph 
                        header={weight.header} 
                        height="300"
                        width="300"
                        values={weight.values}
                        target={defaultProfile.targets.weight}
                        />
                    : ''}
            </div>
        );
    }
}

export default Radium(Overview);

// <h2>Table</h2>
//                 <ul>
//                     <li>All excercises listed</li>
//                     <li>Startvalue, currentvalue, % gain</li>
//                     <li>Target value</li>
//                     <li>Estimated target arrival</li>
//                 </ul>
//                 <ul>
//                     <li>Example, pullups</li>
//                     <li>Y-axis: amount of pullups 0-Max</li>
//                     <li>X-axis: Dates, start-Current</li>
//                     <li>Target value as roof-line
// </li>
//                 </ul> 
// <h3 style={sp.textMargin}>Today</h3>
                // <ul style={sp.headerMargin}>
                //     <li style={sp.listItem}>Pull-Ups: 10 rep</li>
                //     <li style={sp.listItem}>Push-Ups: 20 rep</li>
                //     <li style={sp.listItem}>Sit-Ups: 80 rep</li>
                //     <li style={sp.listItem}>10 km: 54 min</li>
                // </ul>
                
                // <h3 style={sp.textMargin}>This week</h3>
                // <ul style={sp.headerMargin}>
                //     <li style={sp.listItem}>Pull-Ups: 18 rep</li>
                //     <li style={sp.listItem}>Push-Ups: 42 rep</li>
                //     <li style={sp.listItem}>Sit-Ups: 153 rep</li>
                //     <li style={sp.listItem}>20 km: 112 min</li>
                // </ul>

                // <h3 style={sp.textMargin}>This month</h3>
                // <ul style={sp.headerMargin}>
                //     <li style={sp.listItem}>Pull-Ups: 38 rep</li>
                //     <li style={sp.listItem}>Push-Ups: 74 rep</li>
                //     <li style={sp.listItem}>Sit-Ups: 273 rep</li>
                //     <li style={sp.listItem}>40 km: 242 min</li>
                // </ul>