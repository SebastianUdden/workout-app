import React from 'react';
import Radium from 'radium';
import s from './overview-style';

import Graph from '../../graph/Graph.jsx';
import defaultProfile from '../../../mock-data/defaultProfile';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        let types = [];
        for(let type in this.props.data) {
            types.push(type);
        }
        this.state = {
            tab: 1,
            types: types
        }
    }    

    render() {            
        let icons = this.state.types.map((type, index) => {
            let Svg = this.props.svgs[type];
            return <span key={index + 1} 
                         onClick={() => this.setState({tab: index + 1})}>
                            <Svg 
                                width={100 / (this.state.types.length * 1.4) + '%'}
                                style={this.props.style.icon} />                            
                    </span>
        });    
        let graph = this.state.types.map((type, index) => {
            if (this.state.tab === index + 1) {
                return <Graph 
                            key={index + 1}
                            header={this.props.data[type].header} 
                            height={document.documentElement.clientHeight * 0.5}
                            width={document.documentElement.clientWidth * 0.8}
                            values={this.props.data[type].values}
                            target={defaultProfile.targets[type]}
                            />
            }
        });
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

// <img 
//                                 key={index + 1} 
//                                 style={{...this.props.style.icon, width: 100 / (this.state.types.length * 1.4) + 'vw'}} 
//                                 src={'/images/' + type + '.svg'} 
//                                 alt={type} />