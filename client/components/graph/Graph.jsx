import React from 'react';
import Radium from 'radium';
import s from './graph-style';

import TargetSVG from '../svgs/TargetSVG.jsx';

class Graph extends React.Component {
    constructor(props) {
        super(props);                        
        
        if (this.props.values.length > 1) {
            let firstDate = this.props.values[this.props.values.length - 1].date;
            let startTime = new Date(firstDate).getTime(firstDate);
            
            let currentDate = new Date();
            let currentTime = currentDate.getTime();
            let firstValue = this.props.values[this.props.values.length - 1].value;
            let lastValue = this.props.values[0].value;
            let percentageChange = (lastValue - firstValue) / firstValue * 100;
            percentageChange = percentageChange === 0 ? 1 : percentageChange;
            
            let daysDiff = Math.round((currentTime - startTime) / (1000*60*60*24));
            let percentagePerDay = percentageChange / daysDiff;
            let percentageRequired = (this.props.target - lastValue) / lastValue * 100;
            let daysToTarget = Math.round(percentageRequired / percentagePerDay);
            
            let targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + daysToTarget);
    
            let timeDiffCurrent = currentTime - startTime;
            let timeDiffCurrentIncrement = timeDiffCurrent / 3;
           
            let secondDateCurrent = new Date(startTime + timeDiffCurrentIncrement).toISOString().substring(0, 10);
            let thirdDateCurrent = new Date(startTime + timeDiffCurrentIncrement * 2).toISOString().substring(0, 10);  
            let secondDateCurrentArray = secondDateCurrent.split('-');
            let thirdDateCurrentArray = thirdDateCurrent.split('-');
    
            let targetTime = targetDate.getTime();
            let timeDiffTarget = targetTime - startTime;
            let timeDiffTargetIncrement = timeDiffTarget / 3;
            let secondDateTarget = new Date(startTime + timeDiffTargetIncrement).toISOString().substring(0, 10);
            let thirdDateTarget = new Date(startTime + timeDiffTargetIncrement * 2).toISOString().substring(0, 10);  
            let secondDateTargetArray = secondDateTarget.split('-');
            let thirdDateTargetArray = thirdDateTarget.split('-');
    
            let firstDateArray = firstDate.split('-');        
            let currentDateArray = currentDate.toISOString().substring(0, 10).split('-');
            let targetDateArray = targetDate.toISOString().substring(0, 10).split('-');
    
            let widthPercentage = this.props.width < 1000 ? this.props.width / 100 : 10;
            let heightPercentage = this.props.height / 100;
            let maxValueLogged = Math.max.apply(
                Math, 
                this.props.values.map((v) => { 
                    return v.value; 
            }));
            let minValueLogged = Math.min.apply(
                Math, 
                this.props.values.map((v) => {
                    return v.value;
            }));
    
            let months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Okt',
                'Nov',
                'Dec'
            ];
            this.state = {                
                maxValueLogged: maxValueLogged,
                minValueLogged: minValueLogged,
                showGraph: false,
                showTarget: true,
                verticalLineTextXpos: widthPercentage * 12,
                activeChartLeft: widthPercentage * 15,
                activeChartRight: widthPercentage * 100,
                activeChartWidth: widthPercentage * 85,
                activeChartTop: heightPercentage * 20,
                activeChartBottom: heightPercentage * 99,
                activeChartHeight: heightPercentage * 79,
                currentDate: months[parseInt(currentDateArray[1]) - 1] + ' ' + currentDateArray[2],
                targetDate: months[parseInt(targetDateArray[1]) - 1] + ' ' + targetDateArray[2],
                startDate: months[parseInt(firstDateArray[1]) - 1] + ' ' + firstDateArray[2], 
                secondDateCurrent: months[parseInt(secondDateCurrentArray[1]) - 1] + ' ' + secondDateCurrentArray[2],
                thirdDateCurrent: months[parseInt(thirdDateCurrentArray[1]) - 1] + ' ' + thirdDateCurrentArray[2],
                secondDateTarget: months[parseInt(secondDateTargetArray[1]) - 1] + ' ' + secondDateTargetArray[2],
                thirdDateTarget: months[parseInt(thirdDateTargetArray[1]) - 1] + ' ' + thirdDateTargetArray[2],
                currentTime: currentTime,
                targetTime: targetTime,
                timeDiffCurrent: timeDiffCurrent,
                timeDiffTarget: timeDiffTarget,
                xLabelWidth: 50,
            }
        } else {
            let widthPercentage = this.props.width < 1000 ? this.props.width / 100 : 10;
            let heightPercentage = this.props.height / 100;

            this.state = {
                activeChartLeft: widthPercentage * 15,
                activeChartRight: widthPercentage * 100,
                activeChartWidth: widthPercentage * 85,
                activeChartTop: heightPercentage * 20,
                activeChartBottom: heightPercentage * 99,
                activeChartHeight: heightPercentage * 79
            }
        }
    }

    getDataPoints(spreadValue, maxValue) {
        let startX = this.state.activeChartLeft + 20;
        let endX = this.state.activeChartRight - 20;

        return this.props.values.map((point) => {
            return {
                key: point.date + point.value,
                x: startX + (endX - startX) * (
                    this.state.showTarget ? (1 - (this.state.targetTime - new Date(point.date).getTime()) / this.state.timeDiffTarget)
                    : (1 - (this.state.currentTime - new Date(point.date).getTime()) / this.state.timeDiffCurrent)
                ),
                y: this.state.activeChartTop + 
                (this.state.activeChartHeight) /
                    (spreadValue / 
                        (maxValue - point.value)),
                dataValue: point.value,
                radius: 3
            };
        });
    }

    getLinePoints(dataPoints) {
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
        return linePoints;
    }

    getTargetLineHeight(maxValue) {
        if (!this.props.highTarget && this.state.showTarget && this.props.target < this.state.minValueLogged) {
            return this.state.activeChartBottom;
        } else {
            let multiplier = this.props.target / maxValue;
            return multiplier !== 1 
                ? (1 - multiplier) * this.state.activeChartHeight + this.state.activeChartTop
                : this.state.activeChartTop;   
        }
    }

    toggleTarget() {
        this.setState({showTarget: !this.state.showTarget});
    }

    render() {   
        let maxValue = 0;
        if (this.props.highTarget && this.state.showTarget && this.props.target > this.state.maxValueLogged) {
            maxValue = this.props.target;
        } else {
            maxValue = this.state.maxValueLogged;
        }
        let minValue = 0;
        if (!this.props.highTarget && this.state.showTarget && this.props.target < this.state.minValueLogged) {
            minValue = this.props.target;
        } else {
            minValue = this.state.minValueLogged;
        }
        let valueSpread = maxValue - minValue;
        let targetLineHeight = this.getTargetLineHeight(maxValue);
        
        let dataPoints = this.getDataPoints(valueSpread, maxValue);
        let linePoints = this.getLinePoints(dataPoints);
        
        let lines = linePoints.map((line) => {
            if (this.props.values.length > 1) {
                return <line 
                            style={s.dataLine}
                            key={line.key}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2} />
            } else {
                return <div key="1"></div>
            }
        });
        let circles = dataPoints.map((point) => {
            if (this.props.values.length > 1) {
                return <circle 
                            style={s.dataCircle}
                            key={point.key}
                            cx={point.x}
                            cy={point.y}
                            data-value={point.dataValue}
                            r={point.radius}>
                        </circle>
            } else {
                return <div key="2"></div>
            }
        });

        return (
            <div style={s.container}>            
                <h2 
                    key={'h2-' + this.props.header}
                    onClick={this.props.values.length > 1 ? () => this.toggleTarget() : console.log('No values to reference target...')} 
                    style={s.h2}>
                    {this.props.header} 
                    
                    <div style={s.icon}>
                        {this.state.showTarget ? 
                            <TargetSVG style={s.target} />
                        :   <span style={{...s.hideTarget}}>-</span>
                        }
                    </div>
                </h2>
                <svg style={s.chart} width={this.props.width} height={this.props.height}>
                    <g style={s.supportLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartTop} 
                            x2={this.state.activeChartRight}
                            y2={this.state.activeChartTop}></line>
                    </g>    
                    <g style={s.supportLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartHeight * 0.25 + this.state.activeChartTop} 
                            x2={this.state.activeChartRight}
                            y2={this.state.activeChartHeight * 0.25 + this.state.activeChartTop}></line>
                    </g>
                    <g style={s.supportLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartHeight * 0.5 + this.state.activeChartTop} 
                            x2={this.state.activeChartRight}
                            y2={this.state.activeChartHeight * 0.5 + this.state.activeChartTop}></line>
                    </g>
                    <g style={s.supportLine}>
                        <line 
                            x1={this.state.activeChartLeft}
                            y1={this.state.activeChartHeight * 0.75 + this.state.activeChartTop} 
                            x2={this.state.activeChartRight}
                            y2={this.state.activeChartHeight * 0.75 + this.state.activeChartTop}></line>
                    </g>
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
                    {this.state.showTarget ? 
                        <g style={s.targetLine}>
                            <line 
                                x1={this.state.activeChartLeft}
                                y1={targetLineHeight} 
                                x2={this.state.activeChartRight}
                                y2={targetLineHeight}></line>
                        </g>
                    : ''}                
                    {this.state.showTarget ? 
                        <g style={s.targetProgressLine}>
                            <line 
                                x1={dataPoints[dataPoints.length - 1].x}
                                y1={dataPoints[dataPoints.length - 1].y} 
                                x2={this.state.activeChartRight - 20}
                                y2={targetLineHeight}></line>
                        </g>
                    : ''}
                    {this.props.values.length > 1 ? <g className="labels y-labels">                        
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartTop * 1.06} textAnchor="end">{Math.round((maxValue) * 10) / 10}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartHeight * 0.265 + this.state.activeChartTop} textAnchor="end">
                            {Math.round((minValue + valueSpread * 0.75) * 10) / 10}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartHeight * 0.515 + this.state.activeChartTop} textAnchor="end">
                            {Math.round((minValue + valueSpread * 0.5) * 10) / 10}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartHeight * 0.765 + this.state.activeChartTop} textAnchor="end">
                            {Math.round((minValue + valueSpread * 0.25) * 10) / 10}</text>
                        <text x={this.state.verticalLineTextXpos} y={this.state.activeChartBottom} textAnchor="end">
                            {Math.round((minValue) * 10) / 10}</text>
                    </g> : ''}
                    <g className="data" data-setname="Lines">
                        {lines}
                    </g>
                    <g className="data" data-setname="Circles">
                        {circles}
                    </g>
                </svg>
                {this.props.values.length > 1 ? <div style={{...s.xLabels, marginLeft: this.state.activeChartLeft, width: this.state.activeChartRight - this.state.activeChartLeft}}>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-25" y="35" transform="rotate(-45)">
                            {this.state.startDate}
                            </text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-25" y="35" transform="rotate(-45)" style={{display: this.props.values.length > 3 ? 'block' : 'none'}}>
                            {this.state.showTarget ? this.state.secondDateTarget : this.state.secondDateCurrent}
                        </text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-25" y="35" transform="rotate(-45)" style={{display: this.props.values.length > 3 ? 'block' : 'none'}}>
                            {this.state.showTarget ? this.state.thirdDateTarget : this.state.thirdDateCurrent}
                        </text></g>
                    </svg>
                    <svg style={{...s.xLabel}} width={this.state.xLabelWidth} height={this.state.xLabelWidth}>
                        <g><text x="-25" y="35" transform="rotate(-45)">
                            {this.state.showTarget ? this.state.targetDate : this.state.currentDate}
                        </text></g>
                    </svg>
                </div> : ''}
            </div>
        );
    }
}

export default Radium(Graph);
