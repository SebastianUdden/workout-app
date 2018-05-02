import React from 'react';
import Radium from 'radium';
import s from './clock-style';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {date: new Date()};
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h4>Time: {this.state.date.toLocaleTimeString()}</h4>
            </div>
        );
    }
}

export default Radium(Clock);