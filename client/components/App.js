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
            <div>
                <AppContent page={this.state.page} source="Mock Data" />
                <AppFooter switchPage={(number) => this.switchPage(number)} />
            </div>
        );
    }
}
