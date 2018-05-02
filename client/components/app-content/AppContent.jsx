import React from 'react';
import Radium from 'radium';
import s from './app-content-style';

import Workout from './workout/Workout.jsx';
import Profile from './profile/Profile.jsx';
import Overview from './overview/Overview.jsx';

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
            svgs: {
                'pullup': PullupSVG,
                'pushup': PushupSVG,
                'situp': SitupSVG,
                'squat': SquatSVG,
                'running': RunningSVG,
                'weight': WeightSVG
            },
            profile: this.props.profile
        };
    }    

    logout() {
        this.setState({profile: undefined});
        this.props.logout();
    }

    render() {       
        return (
            <div style={s.container}>                           
                {this.props.page === 1 && this.props.loggedIn ? 
                    <div>
                        <Workout 
                            url={this.props.usersUrl + this.props.userId}
                            saveProfile={(profile) => this.props.saveProfile(profile)}
                            profile={this.state.profile}
                            svgs={this.state.svgs} 
                            style={s} 
                            width={this.props.width} />                       
                    </div>
                : ''}
                {this.props.page === 2 && this.props.loggedIn ? 
                    <div>
                        <Profile 
                            url={this.props.usersUrl + this.props.userId}
                            saveProfile={(profile) => this.props.saveProfile(profile)}
                            profile={this.state.profile}
                            logout={() => this.logout()}
                            style={s} 
                            width={this.props.width} />
                    </div>
                : ''}
                {this.props.page === 3 && this.props.loggedIn ? 
                    <div>
                        <Overview 
                            profile={this.state.profile}
                            svgs={this.state.svgs} 
                            style={s} 
                            width={this.props.width} />
                    </div>
                : ''}                
            </div>                
        );
    }
}

export default Radium(AppContent);