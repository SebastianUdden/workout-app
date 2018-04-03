import React from 'react';
import Article from './article/Article.jsx';

export default class Articles extends React.Component {
    constructor(props) {
        super(props);        
    };
    
    render() {        
        let articles = this.props.articles.map((article) =>
            <Article key={article.header} header={article.header} paragraphs={article.paragraphs} />
        );        
        return (
            <div>
                {articles}
            </div>
        );
    }
}
