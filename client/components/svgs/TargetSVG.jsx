import React from 'react';
import Radium from 'radium';

class OverviewSVG extends React.Component {
    render() {
        let view = '0 0 512 512'
        return (
            <svg 
                viewBox={view} 
                style={{...this.props.style, 
                    width: this.props.width, 
                    enableBackground: 'new ' + view}}>
                <g>
                    <g>
                        <circle 
                            cx="256" 
                            cy="256" 
                            r="32"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path 
                            d="M461.026,236C451.573,138.344,373.656,60.427,276,50.974V0h-40v50.974C138.344,60.427,60.427,138.344,50.974,236H0v40
                            h50.974c9.453,97.656,87.37,175.573,185.026,185.026V512h40v-50.974c97.656-9.453,175.573-87.371,185.026-185.026H512v-40H461.026
                            z M420.792,276C411.674,351.577,351.577,411.674,276,420.792V370h-40v50.792C160.423,411.674,100.326,351.577,91.208,276H142v-40
                            H91.208C100.326,160.423,160.423,100.326,236,91.208V142h40V91.208c75.577,9.117,135.674,69.214,144.792,144.792H370v40H420.792z"
                            />
                    </g>
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