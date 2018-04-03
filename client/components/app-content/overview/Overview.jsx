import React from 'react';
import Radium from 'radium';
import s from './overview-style';

import Graph from './graph/Graph.jsx';
import defaultProfile from '../../../mock-data/defaultProfile';

class Overview extends React.Component {
    constructor(props) {
        super(props);

        let types = [];
        for(let type in this.props.data) {
            types.push(type);
        }
        this.state = {
            tab: 6,
            types: types
        }
    }    

    render() {    
        let icons = this.state.types.map((type, index) => {
            return <span key={index + 1} 
                         onClick={() => this.setState({tab: index + 1})}>
                            <img 
                                key={index + 1} 
                                style={{...s.icon, width: 100 / (this.state.types.length * 1.4) + 'vw'}} 
                                src={'/images/' + type + '.svg'} 
                                alt={type} />
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
        let sp = this.props.style;
        return (
            <div>
                <h1 style={sp.textMargin}>Overview</h1>
                <p style={sp.headerMargin}>
                    {icons}
                </p>
                {graph}                
            </div>
        );
    }
}

export default Radium(Overview);
