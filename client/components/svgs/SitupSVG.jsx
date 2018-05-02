import React from 'react';
import Radium from 'radium';

class OverviewSVG extends React.Component {
    render() {
        let view = '0 0 197.595 197.594'
        return (
            <svg 
                id="Situp"
                viewBox={view} 
                style={{...this.props.style, 
                    width: this.props.width, 
                    enableBackground: 'new ' + view}}>
                <g>
                    <g>
                        <ellipse 
                            cx="18.333" 
                            cy="58.693" 
                            rx="18.333" 
                            ry="18.091"/>
                        <path 
                            d="M194.396,136.415l-38.216-34.863c-3.259-2.972-8.101-3.403-11.832-1.053l-38.368,24.153
                            c-1.735,1.093-3.966,0.996-5.601-0.241L44.103,81.829c-6.721-5.078-16.286-3.748-21.365,2.971
                            c-2.077,2.749-3.049,5.973-3.051,9.17c-0.001,0.01,0.03,0.018,0.03,0.027v55.496c0,4.143,3.358,7.5,7.5,7.5H69.6
                            c3.611,0,6.537-2.968,6.537-6.578c0-3.609-2.926-6.578-6.537-6.578H35.174c-1.271,0-2.3-1.029-2.3-2.301v-30.068l51.074,38.658
                            c2.038,1.539,9.962,4.881,18.016,0.229c10.335-5.974,37.817-23.668,44.854-28.211c0.981-0.634,2.262-0.524,3.125,0.262
                            l31.236,28.498c4.001,3.651,10.202,3.362,13.854-0.638C198.684,146.268,198.398,140.066,194.396,136.415z"/>
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