import React from 'react';
import NavButton from '../nav-button/NavButton.jsx';
import NavExternal from '../nav-button/NavExternal.jsx';
import styles from './footer-styles';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lastScrollPosition: 0,
            lastClick: 0
        }
    }

    updateLastClick(lastClick, e) {
        e.preventDefault();
        this.setState({lastClick: lastClick});
    }

    render() {        
        let navButtons = this.props.navButtons.map((navButton) =>
            <NavButton
                id={navButton.id} 
                key={navButton.id}
                goTo={this.goTo} 
                firstRightAligned={navButton.firstRightAligned} 
                lastClick={this.state.lastClick}
                onLastClickUpdate={(e) => this.updateLastClick} />
        );        
        return (
            <footer id="Contact" style={styles.footer}>
                <nav style={styles.menu}>
                    {navButtons}
                    <NavExternal externalRef={this.props.externalRef} />
                </nav>
            </footer>
        );
    }
}
