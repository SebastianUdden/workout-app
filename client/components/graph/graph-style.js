export default {
    container: {
        // border: '1px solid purple',
        maxWidth: '1200px'    
    },
    icon: {        
        display: 'inline-block',
        width: '35px',
        border: '2px solid #ea9363',
        margin: '0 5px',
        padding: '2px 3px',
        borderRadius: '10px'
    },
    h2: {
        fontSize: '25px',
        userSelect: 'none',
        ':hover': {
            cursor: 'pointer'
        }
    },
    target: {
        width: '24px', 
        position: 'relative',
        top: '2px',
        ':hover': { fill: '#ea9363' },
        ':focus': { fill: '#ea9363' },
        ':active': { fill: '#ea9363' }
    },
    hideTarget: {        
        fontSize: '28.5px',
        position: 'relative',
        top: '-2px',
        left: '8px', 
        ':hover': {
            color: '#ea9363',
        }       
    },
    chart: {
        // border: '1px solid blue',
        display: 'block',
        maxWidth: '1100px',
        minWidth: '240px',
    },
    xLabels: {
        // border: '2px solid black',        
        marginTop: '3px',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '850px'
    },
    xLabel: {
        // border: '1px solid green'        
    },    
    gridLine: {
        stroke: '#ccc',
        strokeDasharray: 0,
        strokeWidth: 3
    },
    supportLine: {
        stroke: '#eeeeee',
        strokeDasharray: 0,
        strokeWidth: 1
    },
    targetLine: {
        stroke: '#da8353',
        strokeDasharray: 0,
        strokeWidth: 2
    },
    targetProgressLine: {
        stroke: '#da8353',
        strokeDasharray: 2,
        strokeWidth: 1
    },
    dataLine: {
        stroke: '#444',
        strokeDasharray: 0,
        strokeWidth: 2
    },
    dataCircle: {
        fill: '#da8353',
        stroke: '#fff',
        strokeWidth: 1
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