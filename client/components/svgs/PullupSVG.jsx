import React from 'react';
import Radium from 'radium';

class OverviewSVG extends React.Component {
    render() {
        let view = '0 0 197.039 197.039'
        return (
            <svg 
                id="Pullup"
                viewBox={view} 
                style={{...this.props.style, 
                    width: this.props.width, 
                    enableBackground: 'new ' + view}}>
                <g>
                    <g>
                        <ellipse cx="100.063" cy="35.062" rx="14.965" ry="14.767"/>
                        <path d="M132.391,5.637c-0.16-1-0.273-1.491-0.314-1.646c-0.736-2.854-3.654-4.398-6.502-3.662c-2.396,0.619-3.99,2.308-4,5.308
                            H78.651c-0.012-3-1.605-4.856-4.001-5.477c-2.849-0.735-5.765,1.146-6.5,4.002c-0.041,0.155-0.154,0.475-0.315,1.475H38.874
                            c-7.928,0-14.354,6.426-14.354,14.354v171.92c0,2.832,2.173,5.122,5.004,5.122l0,0c2.833,0,4.996-2.29,4.996-5.122V18.692
                            c0-2.791,2.263-5.055,5.055-5.055h26.762c-2.025,14-2.933,40.004,15.048,50.263c0.292,0.166,0.92,0.351,0.92,0.351l-0.138,124.754
                            c0,4.42,3.755,7.974,8.175,7.974c4.422,0,8.178-3.612,8.178-8.031v-60.311h3v60.31c0,4.419,3.83,8.003,8.25,8.003
                            s8.137-3.584,8.137-8.003l-0.041-124.813c0,0,0.656-0.066,0.947-0.233c17.979-10.26,17.102-36.263,15.077-50.263h21.575
                            c2.791,0,5.055,2.264,5.055,5.055v172.706c0,3.115,2.883,5.642,6,5.642c3.115,0,6-2.525,6-5.642V19.991
                            c0-7.928-6.426-14.354-14.354-14.354H132.391z M116.756,51.637H83.47c-8.87-8-8.252-27-6.374-38h46.033
                            C125.008,24.637,125.627,43.637,116.756,51.637z"/>
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