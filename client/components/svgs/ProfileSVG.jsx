import React from 'react';
import Radium from 'radium';

class OverviewSVG extends React.Component {
    render() {
        let view = '0 0 258.75 258.75'
        return (
            <svg 
                viewBox={view} 
                style={{...this.props.style, 
                    width: this.props.width, 
                    enableBackground: 'new ' + view}}>
                <g>
                    <circle 
                        style={{fill: this.props.color }}
                        cx="129.375" 
                        cy="60" 
                        r="60"/>
                    <path 
                        style={{fill: this.props.color }}
                        d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
            </svg>
        );
    }
}

export default Radium(OverviewSVG);