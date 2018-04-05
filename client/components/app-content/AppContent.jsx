import React from 'react';
import Radium from 'radium';
import s from './app-content-style';

import Workout from './workout/Workout.jsx';
import Profile from './profile/Profile.jsx';
import Overview from './overview/Overview.jsx';

import Stamp from '../tools/stamp/Stamp.jsx';

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
            usersUrl: 'http://localhost:3005/api/users/',
            // usersUrl: 'https://arcane-journey-35345.herokuapp.com/api/users/',
            userId: '5ac60344808d1f0d0011a59d',
            svgs: {
                'pullup': PullupSVG,
                'pushup': PushupSVG,
                'situp': SitupSVG,
                'squat': SquatSVG,
                'running': RunningSVG,
                'weight': WeightSVG
            },
            profile: undefined
        }
    }

    componentDidMount() {
        fetch(this.state.usersUrl)
            .then((data) => data.json())
            .then((data) => {
                let db = data[0];
                this.setState({
                    profile: db
                })
            })        
            .catch((error) => {
                console.log('Something went wrong...');
            });            
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
                            url={this.state.usersUrl + this.state.userId}
                            profile={this.state.profile}
                            svgs={this.state.svgs} 
                            style={s} 
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
                            url={this.state.usersUrl + this.state.userId}
                            profile={this.state.profile}
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
                            profile={this.state.profile}
                            svgs={this.state.svgs} 
                            style={s} 
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