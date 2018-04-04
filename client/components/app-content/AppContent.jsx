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

import PullupSVG from '../svgs/PullupSVG.jsx';
import PushupSVG from '../svgs/PushupSVG.jsx';
import SitupSVG from '../svgs/SitupSVG.jsx';
import SquatSVG from '../svgs/SquatSVG.jsx';
import RunningSVG from '../svgs/RunningSVG.jsx';
import WeightSVG from '../svgs/WeightSVG.jsx';

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
            },
            svgs: {
                'pullup': PullupSVG,
                'pushup': PushupSVG,
                'situp': SitupSVG,
                'squat': SquatSVG,
                'running': RunningSVG,
                'weight': WeightSVG
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
                        <Workout 
                            svgs={this.state.svgs} 
                            style={s} 
                            data={this.state.mockData} 
                            width={this.props.width} />
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
                        <Profile 
                            style={s} 
                            width={this.props.width} />
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
                        <Overview 
                            svgs={this.state.svgs} 
                            style={s} 
                            data={this.state.mockData} 
                            width={this.props.width} />
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