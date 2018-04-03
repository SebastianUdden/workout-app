import React from 'react';
import Radium from 'radium';
import s from './graph-style';

class Graph extends React.Component {
    constructor(props) {
        super(props);                
        
        let currentDate = new Date().toISOString().substring(0, 10);
        let wp = this.props.width / 100;
        let hp = this.props.height / 100;        
        
        this.state = {
            wp: wp,
            hp: hp,
            verticalLineXpos: wp * 15,
            verticalLineTextXpos: wp * 12,
            activeChartTop: hp * 20,
            activeChartBottom: hp * 99,
            activeChartHeight: hp * 79,
            horizontalLineTextYpos: hp * 95, 
            horizontalLineTextXposMax: wp * 100,
            startDate: this.props.values[this.props.values.length - 1].date.split('-')[1]
               + '-' + this.props.values[this.props.values.length - 1].date.split('-')[2], 
            currentDate: currentDate.split('-')[1] + '-' +  currentDate.split('-')[2],
            xLabelWidth: 50,
            maxValueLogged: Math.max.apply(
                Math, 
                this.props.values.map((v) => { 
                    return v.value; 
            }))
        }
    }

    getDataPoints(maxValue) {
        let startX = (this.state.verticalLineXpos - this.state.horizontalLineTextXposMax) * 1 + this.state.horizontalLineTextXposMax + 30;
        let endX = (this.state.verticalLineXpos - this.state.horizontalLineTextXposMax) * 0.25 + this.state.horizontalLineTextXposMax;
        let currentDate = new Date().getTime();
        let diff = currentDate - new Date(this.props.values[this.props.values.length - 1].date).getTime();

        return this.props.values.map((point) => {
            return {
                key: point.date + point.value,
                x: startX + (endX + 55 - startX) * (1 - (currentDate - new Date(point.date).getTime()) / diff),
                y: this.state.activeChartTop + 
                (this.state.activeChartHeight) /
                    (maxValue / 
                        (maxValue - point.value)),
                dataValue: point.value,
                radius: 3
            };
        });
    }

    getTargetLineHeight(maxValue) {
        let multiplier = this.props.target / maxValue;
        return multiplier !== 1 
            ? (1 - multiplier) * this.state.activeChartHeight + this.state.activeChartTop
            : this.state.activeChartTop;   
    }

    render() {   
        let maxValue = this.state.maxValueLogged > this.props.target ? this.state.maxValueLogged : this.props.target;
        let targetLineHeight = this.getTargetLineHeight(maxValue);     
        
        let dataPoints = this.getDataPoints(maxValue);
        let linePoints = [];
        let linePointsCounter = 0;
        for (let i = 1; i < dataPoints.length; i++) {
            linePoints.push({
                key: dataPoints[i].key,
                x1: dataPoints[i - 1].x,
                y1: dataPoints[i - 1].y,
                x2: dataPoints[i].x,
                y2: dataPoints[i].y,
            });
        }
        let lines = linePoints.map((line) => {
            return <line 
                        style={s.dataLine}
                        key={line.key}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2} />
        });
        let circles = dataPoints.map((point) => {
            return <circle 
                        style={s.dataCircle}
                        key={point.key}
                        cx={point.x}
                        cy={point.y}
                        data-value={point.dataValue}
                        r={point.radius}>
                    </circle>
        });

        return (
            <div style={s.container}>            
                <h2>{this.props.header}</h2>
                <svg style={s.chart} width={this.props.width} height={this.props.height}>
                    <g style={s.gridLine}>
                        <line 
                            x1={this.state.verticalLineXpos}
                            y1={this.state.activeChartTop - 25} 
                            x2={this.state.verticalLineXpos}
                            y2={this.state.activeChartBottom}></line>
                    </g>
                    <g style={s.gridLine}>
                        <line 
                            x1={this.state.verticalLineXpos}
                            y1={this.state.activeChartBottom} 
                            x2={this.state.horizontalLineTextXposMax}
                            y2={this.state.activeChartBottom}></line>
                    </g>
                    <g style={s.targetLine}>
                        <line 
                            x1={this.state.verticalLineXpos}
                            y1={targetLineHeight} 
                            x2={this.state.horizontalLineTextXposMax}
                            y2={targetLineHeight}></line>
                    </g>
                    
                    <g className="labels y-labels">                        
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartTop} textAnchor="end">{maxValue}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.25 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.75)}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.5 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.5)}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.75 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.25)}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartBottom} textAnchor="end">0</text>
                    </g>
                    <g className="data" data-setname="Circles">
                        {circles}
                    </g>
                    <g className="data" data-setname="Lines">
                        {lines}
                    </g>
                </svg>
                <div style={{...s.xLabels, marginLeft: this.state.verticalLineXpos, width: this.state.horizontalLineTextXposMax - this.state.verticalLineXpos}}>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.startDate}</text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.startDate}</text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.startDate}</text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.currentDate}</text></g>
                    </svg>
                </div>
            </div>
        );
    }
}

export default Radium(Graph);

// <circle 
//                         key={point.date + point.value}
//                         cx={startX + (endX + 55 - startX) * (1 - (currentDate - new Date(point.date).getTime()) / diff)}
//                         cy={this.state.activeChartTop + 
//                             (this.state.activeChartHeight) /
//                                 (maxValue / 
//                                     (maxValue - point.value))}
//                         data-value={point.value}
//                         r="3">
//                     </circle>