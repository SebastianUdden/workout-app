import React from 'react';
import Header from './header/Header.jsx';
import Content from './content/Content.jsx';
import Footer from './footer/Footer.jsx';
import styles from './page-styles';
import data from './page-data';

export default class Page extends React.Component {    
    render() {
        return (            
            <div style={styles.page}>            
                <Header navButtons={data.navButtons} />
                <Content content={data.content} />  
                <Footer navButtons={data.footerButtons} 
                        externalRef={data.externalRef} />                
            </div>
        );
    }
}
