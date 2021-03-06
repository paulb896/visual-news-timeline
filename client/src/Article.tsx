import * as React from 'react';

import './Article.css';

class Article extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        const { articleBody, headline, id, publishedAt, url } = props;
        const [date, time] = publishedAt.split('T');

        this.state = {
            articleBody,
            headline,
            id,
            publishedAt: date,
            time: time.split('Z')[0],
            url
        };
    }

    public render() {
        return (
            <div className="article">
                <a href={ this.state.url }>
                  <h3>{ this.state.headline }</h3>
                </a>
                <p>{ this.state.publishedAt } - { this.state.time }</p>
                <p>{ this.state.articleBody }</p>
            </div>
        );
    }
}

export default Article;
