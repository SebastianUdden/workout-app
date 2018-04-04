import React from 'react';
import Page from './page/Page.jsx';
import BoxContainer from './box-container/BoxContainer.jsx';

import AppContent from './app-content/AppContent.jsx';
import AppFooter from './app-footer/AppFooter.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 3
        };
    }

    switchPage(number) {
        this.setState({page: number});
    }
    
    render() {
        return(
            <div style={{
                // border: '1px solid green',
                width: '100%',
                minWidth: '300px',
                margin: '0 auto'
            }}>
                <div 
                    id="Container"
                    style={{
                        maxWidth: '1200px',
                        minWidth: '300px',
                        margin: '0 auto',
                        display: 'block', 
                        // border: '1px solid red',                    
                    }}> 
                    <AppContent 
                        page={this.state.page} 
                        source="Mock Data" 
                        width={document.getElementById('Container')} />
                </div>
                <AppFooter 
                    switchPage={(number) => this.switchPage(number)} 
                    width={document.body.clientWidth} />
            </div>
        );
    }
}
