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
        
        if (this.state.lastSelect >= (date.getTime() - this.state.delay)) {
            return;
        }

        for (let target in this.props.targets) {
            if (target === type) {
                this.props.targets[type] = document.getElementById(type  + 'ID').value;
                console.log(target, ': ', this.props.targets[type]);     
            }
        }
        
        this.props.updateTargets(type, this.props.targets);
        this.setState({ lastSelect: date.getTime() });
    }    

    render() {
        let options = [];
        for (let i = this.props.min; i < this.props.max; i++) {
            options.push(<option style={s.option} key={'id-' + i} value={i}>{i}</option>)
        }
        
        return (
            <p style={this.props.margin}>                
                <select 
                    id={this.props.type + 'ID'}
                    style={s.select} 
                    defaultValue={this.props.default}
                    onChange={(type) => this.handleChange(this.props.type)}>
                    {options}
                </select>
                {this.props.text}
            </p>
        );
    }
}

export default Radium(ProfileSelect);
