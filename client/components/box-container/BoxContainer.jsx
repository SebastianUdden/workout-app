import React from 'react';
import Radium from 'radium';
import s from './box-container-style';

import Box from '../box/Box.jsx';
import CreateBox from './create-box/CreateBox.jsx';

// import pushups from '../../mock-data/pushups';
// import situps from '../../mock-data/situps';
// import running10km from '../../mock-data/running10km';

class BoxContainer extends React.Component {
    render() {        
        return (
            <div style={s.container}>
                <Box header={pushups.header} type={pushups.type} values={pushups.values} />
                <Box header={situps.header} type={situps.type} values={situps.values} />
                <Box header={running10km.header} type={running10km.type} values={running10km.values} />
                <CreateBox />                
            </div>
        );
    }
}

export default Radium(BoxContainer);