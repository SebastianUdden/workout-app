import React from 'react';
import Radium from 'radium';

class OverviewSVG extends React.Component {
    render() {
        let view = '0 0 197.783 197.783'
        return (
            <svg 
                id="Squat"
                viewBox={view} 
                style={{...this.props.style, 
                    width: this.props.width, 
                    enableBackground: 'new ' + view}}>
                <g>
                    <g>
                        <ellipse 
                            cx="98.957" 
                            cy="16.533" 
                            rx="16.753" 
                            ry="16.533"/>
                        <path 
                            d="M185.24,35.462l-172.698-0.03c-3.299,0-5.974,2.685-5.974,5.984c0,3.299,2.675,5.984,5.974,5.984h66.35v60.763
                            l-24.613,22.188c-3.349,3.019-5.261,7.317-5.261,11.826v46.646c0,4.949,4.004,8.961,8.952,8.961c4.949,0,8.954-4.012,8.954-8.961
                            v-42.521c0-2.059,0.873-4.02,2.402-5.398l21.976-19.805h15.312l21.992,19.805c1.53,1.379,2.404,3.34,2.404,5.399v42.521
                            c0,4.949,4.003,8.961,8.953,8.961c4.947,0,8.953-4.012,8.953-8.961v-46.646c0-4.509-1.912-8.808-5.262-11.826l-24.615-22.188V47.4
                            h36.285l29.916,0.004c3.299,0,5.974-2.672,5.974-5.971C191.212,38.134,188.539,35.462,185.24,35.462z"/>
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