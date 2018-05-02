import React from 'react';
import Radium from 'radium';
import s from './timer-style';

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false,
            pause: false,
            startTime: new Date(),
            endTime: new Date(),
            elapsedTime: 0
        };        
    }
    
    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    startTimer() {        
        this.setState({end: false});
        this.setState({start: true});
        this.setState({pause: false});
        this.setState({startTime: new Date()});
        this.timerID = setInterval(
            () => this.timerTick(), 
            1000
        );
    }

    stopTimer() {        
        this.setState({pause: true});
        this.setState({endTime: new Date()});
        clearInterval(this.timerID);
    }

    saveTime() {
        this.props.saveTime(this.state.elapsedTime);
        this.setState({start: false});
        this.setState({pause: false});
        this.setState({elapsedTime: 0});
        clearInterval(this.timerID);
    }

    // resetTimer() {
    //     this.setState({start: false});
    //     this.setState({pause: false});
    //     this.setState({elapsedTime: 0});
    // }

    timerTick() {
        this.setState({elapsedTime: this.state.elapsedTime + 1});
    }

    render() {
        return (
            <div>
                {!this.state.start 
                    ? <button 
                        id="Start"
                        style={{...s.button, backgroundColor: this.props.color}} 
                        onClick={() => this.startTimer()}>Start</button>
                    : ''
                }
                {this.state.start && !this.state.pause
                    ? <button 
                        id="Pause"
                        style={{...s.button, backgroundColor: this.props.color}} 
                        onClick={() => this.stopTimer()}>Pause</button>
                    : ''
                }
                {this.state.start && this.state.pause
                    ? <button 
                        id="End"
                        style={{...s.button, backgroundColor: this.props.color}} 
                        onClick={() => this.saveTime()}>End</button>
                    : ''
                }
                {this.state.start && this.state.pause
                    ? <button 
                        id="Continue"
                        style={{...s.button, backgroundColor: this.props.color}} 
                        onClick={() => this.startTimer()}>Continue</button>
                    : ''
                }
                
                <span style={s.text}>
                    {this.state.elapsedTime < 60 
                        ? '' 
                        : Math.floor(this.state.elapsedTime / 60) + ' minutes '              
                    }
                    {this.state.elapsedTime < 60 
                        ? this.state.elapsedTime
                        : this.state.elapsedTime % 60
                    } seconds
                </span>
                
            </div>
        );
    }
}

export default Radium(Timer);
