import React from 'react';
import NavButton from '../nav-button/NavButton.jsx';
import NavBurger from '../nav-button/NavBurger.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lastScrollPosition: 0,
            lastClick: 0,
            responsive: false,
            headerMargin: '0vh',
            navDisplay: 'flex',
            navPaddingTop: '2vw',
            iconDisplay: 'none',
            iconFloat: 'none',
            iconPosition: 'static',            
            iconTop: 0,
            iconRight: 0
        }
    }

    componentDidMount() {
        var mediaQueryList = window.matchMedia("(max-width: 600px)");
        mediaQueryList.addListener(this.handleScreenWidthChange);
        this.handleScreenWidthChange(mediaQueryList);

        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            this.addNavMenu(e);
        });
    }
    
    componentWillUnmount() {
        mediaQueryList.removeListener(handleScreenWidthChange);
    }

    handleScreenWidthChange = (evt) => {
        if (evt.matches) {
            this.setState({
                responsive: true,
                border: '3px solid pink',
                iconDisplay: 'block',
                iconFloat: 'right',
                menuItemDisplay: 'none'
            });
        } else {
            this.setState({
                border: '3px solid blue',
                responsive: false,
                border: 'none',
                iconDisplay: 'none',
                iconFloat: 'none',
                menuItemDisplay: 'block'
            });
        }
    }
    
    addNavMenu(e) {
        e.preventDefault();
        let newScrollPosition = window.scrollY;
        if (newScrollPosition < this.state.lastScrollPosition) {
            //upward - code here
            this.showMenu(true, e);
            if (window.pageYOffset < 50) {
                this.refs.Header.classList.add("topSlide");
                this.setState({ 
                    headerMargin: '0 auto',
                    headerBackgroundColor: '#5599dd88'
                });
            }
            if (window.pageYOffset >= this.refs.Header.offsetTop) {
                this.setState({ 
                    headerMargin: '0 auto',
                    headerBackgroundColor: '#5599dd88'                    
                });
            }
        } else {
            //downward - code here    
            if (window.pageYOffset > 160) {
                this.refs.Header.classList.remove("topSlide");
                this.setState({ 
                    headerMargin: '-44vh auto',
                    headerBackgroundColor: '#5599dd00'
                });
            }
        }
        this.setState({ 
            lastScrollPosition: newScrollPosition 
        });
    }

    showMenu(scrollUp, e) {
        if (scrollUp && this.state.responsive) {
            this.setState({
                border: '3px solid yellow',           
                navDisplay: 'flex',
                navPaddingTop: '2vw',                
                iconPosition: 'static',
                menuItemDisplay: 'none',
            });
            return;
        } else if (scrollUp) {
            this.setState({
                border: '3px solid yellow',           
                navDisplay: 'flex',
                navPaddingTop: '2vw',                
                iconPosition: 'static',
            });
            return;
        }
        if (this.state.iconPosition === 'static') {
            this.setState({
                border: '3px solid green',
                navDisplay: 'block',
                navPaddingTop: '7vw',
                iconPosition: 'absolute',
                menuItemDisplay: 'block',
            });
        } else {
            this.setState({
                border: '3px solid red',
                navDisplay: 'flex',
                navPaddingTop: '2vw',                
                iconPosition: 'static',
                iconFloat: 'right',                
                menuItemDisplay: 'none'
            });
        }
    } 

    updateLastClick(lastClick, e) {
        e.preventDefault();
        this.setState({lastClick: lastClick});
    }

    render() {     
        let header = {            
            display: 'flex',
            justifyContent: 'center', 
            position: 'fixed',  
            width: '100%',
            minWidth: '350px',
            padding: '3vh',
            backgroundColor: '#5599dd88',
            transition: '0.5s ease-in-out all',
            right: 0,
            margin: this.state.headerMargin,
            backgroundColor: this.state.headerBackgroundColor,
            // border: this.state.border
        };
        let nav = {
            display: this.state.navDisplay, 
            justifyContent: 'space-between',
            width: '92%',
            paddingTop: this.state.navPaddingTop,
            position: 'relative'
        };
        let navButtons = this.props.navButtons.map((navButton) => 
            <NavButton
                id={navButton.id}                
                key={navButton.id}
                goTo={this.goTo} 
                logo={navButton.logo}
                display={this.state.menuItemDisplay}
                responsive={this.state.responsive}
                firstRightAligned={navButton.firstRightAligned} 
                lastClick={this.state.lastClick}
                onLastClickUpdate={(e) => this.updateLastClick} />
        );
        return (
            <header id="Header" ref="Header" style={header}>
                <nav id="Nav" ref="Nav" style={nav}>
                    {navButtons}                    
                    <NavBurger  
                        display={this.state.iconDisplay}
                        position={this.state.iconPosition}                       
                        showMenu={(e) => this.showMenu(false, e)} />                    
                </nav>
            </header>
        );
    }
}