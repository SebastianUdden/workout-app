import React from 'react';
import Radium from 'radium';
import s from './graph-style';

class Graph extends React.Component {
    constructor(props) {
        super(props);                
        
        let currentDate = new Date();
        let currentDateISO = currentDate.toISOString().substring(0, 10);
        let firstDate = this.props.values[this.props.values.length - 1].date;
        let startTime = new Date(firstDate).getTime(firstDate);
        let currentTime = currentDate.getTime();
        let timeDiff = currentTime - startTime;
        let timeDiffIncrement = timeDiff / 3;
        let secondDate = new Date(startTime + timeDiffIncrement).toISOString().substring(0, 10);
        let thirdDate = new Date(startTime + timeDiffIncrement * 2).toISOString().substring(0, 10);
        let wp = this.props.width / 100;
        let hp = this.props.height / 100;        
        
        this.state = {
            wp: wp,
            hp: hp,
            verticalLineTextXpos: wp * 12,
            activeChartLeft: wp * 15,
            activeChartRight: wp * 100,
            activeChartWidth: wp * 85,
            activeChartTop: hp * 20,
            activeChartBottom: hp * 99,
            activeChartHeight: hp * 79,
            horizontalLineTextYpos: hp * 95, 
            currentDate: currentDateISO.split('-')[1] + '-' +  currentDateISO.split('-')[2],
            startDate: firstDate.split('-')[1] + '-' + firstDate.split('-')[2], 
            secondDate: secondDate.split('-')[1] + '-' + secondDate.split('-')[2],
            thirdDate: thirdDate.split('-')[1] + '-' + thirdDate.split('-')[2],
            startTime: startTime,
            currentTime: currentTime,
            timeDiff: timeDiff,
            xLabelWidth: 50,
            maxValueLogged: Math.max.apply(
                Math, 
                this.props.values.map((v) => { 
                    return v.value; 
            }))
        }
    }

    getDataPoints(maxValue) {
        let startX = this.state.activeChartLeft + 20;
        let endX = this.state.activeChartRight - 20;

        return this.props.values.map((point) => {
            return {
                key: point.date + point.value,
                x: startX + (endX - startX) * (1 - (this.state.currentTime - new Date(point.date).getTime()) / this.state.timeDiff),
                y: this.state.activeChartTop + 
                (this.state.activeChartHeight) /
                    (maxValue / 
                        (maxValue - point.value)),
                dataValue: point.value,
                radius: 4
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
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartTop - 25} 
                            x2={this.state.activeChartLeft}
                            y2={this.state.activeChartBottom}></line>
                    </g>
                    <g style={s.gridLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartBottom} 
                            x2={this.state.activeChartRight}
                            y2={this.state.activeChartBottom}></line>
                    </g>
                    <g style={s.targetLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={targetLineHeight} 
                            x2={this.state.activeChartRight}
                            y2={targetLineHeight}></line>
                    </g>
                    
                    <g className="labels y-labels">                        
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartTop} textAnchor="end">{maxValue}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.25 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.75)}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.5 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.5)}</text>
                        <text x={this.state.verticalLineTextXpos} y={(this.state.activeChartBottom - this.state.activeChartTop) * 0.75 + this.state.activeChartTop} textAnchor="end">{Math.round(maxValue * 0.25)}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartBottom} textAnchor="end">0</text>
                    </g>
                    <g className="data" data-setname="Lines">
                        {lines}
                    </g>
                    <g className="data" data-setname="Circles">
                        {circles}
                    </g>
                </svg>
                <div style={{...s.xLabels, marginLeft: this.state.activeChartLeft, width: this.state.activeChartRight - this.state.activeChartLeft}}>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.startDate}</text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.secondDate}</text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-20" y="35" transform="rotate(-45)">{this.state.thirdDate}</text></g>
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
