import React from 'react';
import Radium from 'radium';
import s from './profile-select-style';

class ProfileSelect extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
            lastSelect: 0,
            delay: 500
        };
    }

    handleChange(type) {
        let date = new Date();
        
        if (this.state.lastSelect >= ( date.getTime() - this.state.delay)) {
            return;
        }

        let targets = {
            "pullup": this.props.targets.pullup,
            "pushup": this.props.targets.pushup,
            "running": this.props.targets.running,
            "situp": this.props.targets.situp,
            "squat": this.props.targets.squat,
            "targetWeight": this.props.targets.targetWeight
        };
        
        for (let target in targets) {
            if (target === type) {
                targets[type] = document.getElementById(type  + 'ID').value;
                console.log(target, ': ', targets[type]);     
            }
        }
        
        this.props.updateTargets(type, targets);
        this.setState({ lastSelect: date.getTime() });
    }    

    render() {
        let options = [];
        for (let i = this.props.min; i < this.props.max; i++) {
            options.push(<option style={s.option} key={'id-' + i} value={i}>{i}</option>)
        }
        
        return (
            <select 
                id={this.props.type + 'ID'}
                style={s.select} 
                defaultValue={this.props.default}
                onChange={(type) => this.handleChange(this.props.type)}>
                {options}
            </select>
        );
    }
}

export default Radium(ProfileSelect);
