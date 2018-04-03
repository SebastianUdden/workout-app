import React from 'react';
import styles from './nav-button-styles';
import Radium from 'radium';

class NavButton extends React.Component {
    constructor(props) {
        super(props);        
    };
    
    scrollTo(targetY, duration) {
        let delay = duration + 1;
        if (this.props.lastClick >= (Date.now() - delay)) { return };
        this.props.onLastClickUpdate(Date.now());

        let start = document.documentElement.scrollTop || document.body.scrollTop;
        let diff = targetY - (document.documentElement.scrollTop || document.body.scrollTop ||  0);            
        let scrollStep = Math.PI / (duration / 10);
        let count = 0;
        let currY = 0;
        let scrollInterval;

        if ((targetY) <= (document.documentElement.scrollTop || document.body.scrollTop)) {
            /* Scroll Up */
            scrollInterval = setInterval(() => {                
                if ((document.documentElement.scrollTop || document.body.scrollTop) != 0) {
                    count++;   
                    currY = 200 * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if ((document.documentElement.scrollTop || document.body.scrollTop) <= (targetY - 10)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop -= currY; 
                    document.body.scrollTop -= currY;
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        } else {
            /* Scroll Down */
            scrollInterval = setInterval(() => {                
                if ((document.documentElement.scrollTop || document.body.scrollTop) != targetY) {
                    count++;
                    currY = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (currY >= (targetY - 220)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop = currY;
                    document.body.scrollTop = currY;
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        }
    }
    
    goTo(elementID, e) {
        e.preventDefault();
        let target = document.getElementById(elementID);
        this.scrollTo(target.offsetTop, 500);
    }

    render() {
        let linkID = '#' + this.props.id; 
        let firstRightAligned;       
        if (this.props.firstRightAligned && this.props.responsive) {
            firstRightAligned = { margin: '20px 20px 20px auto', paddingTop: '6vw' };
        } else if (this.props.firstRightAligned) {
            firstRightAligned = { margin: '20px 20px 20px auto' };
        } else {
            firstRightAligned = {};
        }
        if (this.props.logo) {
            return (
                <a 
                    href={linkID} 
                    onClick={(e) => this.goTo(this.props.id, e)} 
                    style={{...styles.menuItem, ...firstRightAligned}}>
                        {this.props.id}
                </a>                    
            );
        } else {
            return (
                <a 
                    href={linkID} 
                    onClick={(e) => this.goTo(this.props.id, e)} 
                    style={{...styles.menuItem, ...firstRightAligned, display: this.props.display}}>
                        {this.props.id}
                </a>                    
            );
        }
    }
}

export default Radium(NavButton);