import React from 'react';
import Radium from 'radium';
import s from './app-content-style';

import Workout from './workout/Workout.jsx';
import Profile from './profile/Profile.jsx';
import Overview from './overview/Overview.jsx';

import Stamp from '../tools/stamp/Stamp.jsx';

import pullup from '../../mock-data/pullup';
import pushup from '../../mock-data/pushup';
import situp from '../../mock-data/situp';
import squat from '../../mock-data/squat';
import running from '../../mock-data/running';
import weight from '../../mock-data/weight';

class AppContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mockData: {
                'pullup': pullup,
                'pushup': pushup,
                'situp': situp,
                'squat': squat,
                'running': running,
                'weight': weight
            }
        }
    }

    render() {
        let color = {
            r: 139,
            g: 0,
            b: 0,
            a: 0.2
        };
        return (
            <div style={s.container}>                
                {this.props.page === 1 ? 
                    <div>
                        <Workout style={s} data={this.state.mockData} />
                        <Stamp 
                            onTop={false}
                            text={this.props.source} 
                            color={color}
                            size="5"
                            xPercentage="60"
                            yPercentage="-78.1"
                            rotation="25" />
                    </div>
                : ''}
                {this.props.page === 2 ? 
                    <div>
                        <Profile style={s} />
                        <Stamp 
                            onTop={false}
                            text={this.props.source} 
                            color={color}
                            size="5"
                            xPercentage="60"
                            yPercentage="-69.3"
                            rotation="25" />
                    </div>
                : ''}
                {this.props.page === 3 ? 
                    <div>
                        <Overview style={s} data={this.state.mockData} />
                        <Stamp 
                            onTop={false}
                            text={this.props.source} 
                            color={color}
                            size="5"
                            xPercentage="60"
                            yPercentage="-69"
                            rotation="25" />
                    </div>
                : ''}                
            </div>                
        );
    }
}

export default Radium(AppContent);