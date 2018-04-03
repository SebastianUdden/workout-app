import React from 'react';
import Articles from './articles/Articles.jsx';
import styles from './content-styles';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <section style={styles.section}>   
                <div style={styles.content}>   
                    <Articles articles={this.props.content.articles} />
                </div>
            </section>
        );
    }
}