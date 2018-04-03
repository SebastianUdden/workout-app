export default {
    container: {
        // border: '1px solid red'        
    },
    chart: {
        // border: '1px solid blue',
        display: 'block'
    },
    xLabels: {
        // border: '2px solid black',        
        marginTop: '3px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    xLabel: {
        // border: '1px solid green'        
    },    
    gridLine: {
        stroke: '#ccc',
        strokeDasharray: 0,
        strokeWidth: 3
    },
    targetLine: {
        stroke: '#da8353',
        strokeDasharray: 2,
        strokeWidth: 2
    },
    dataLine: {
        stroke: '#444',
        strokeDasharray: 0,
        strokeWidth: 2
    },
    dataCircle: {
        fill: '#da8353'
    },
    xGrid: {
        point1: {
            x: 50,
            y: 30
        },
        point2: {
            x: 50,
            y: 221
        }
    },
    yGrid: {
        point1: {
            x: 50,
            y: 220
        },
        point2: {
            x: 295,
            y: 220
        }
    }
}