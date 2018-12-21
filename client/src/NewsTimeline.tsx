import * as React from 'react';
import HorizontalTimelineContent from './HorizontalTimelineContent';
// import './NewsTimeline.css';

class NewsTimeline extends React.Component<any, any> {

    private articles : Array<{ articleBody: string, headline: string, publishedAt: string, url: string }>;
    constructor(props: any) {
        super(props);
        const { articles } = props;

        window.console.log('NewsTimeline.articles', articles, props)
        this.state = {
            articles
        };
    }

    public componentWillMount() {
        // @ts-ignore
        this.articles = this.props.articles;
      }
    
    public componentWillReceiveProps(nextProps) {
        // @ts-ignore
        this.articles = nextProps.articles;
    }

    public render() {
        window.console.log('render', this.articles);
        const articleData = this.articles
            .map((article, index) => {
            return ({
                component: (
                    <div className='container' key={index}>
                    <h1 style={{fontWeight: 500 }}>{ article.headline }</h1>
                    <h4 style={{fontWeight: 500 }}>
                        {new Date(article.publishedAt).toLocaleTimeString('en-us', {year: 'numeric', month: 'short', day: '2-digit'})}
                    </h4>
                    <hr />
                    <p style={{padding: '0 12% 0 12%'}}>{ article.articleBody }</p>
                    <hr />
                    <a href={article.url}><em>Read More</em></a>
                    </div>
                ),
                date: article.publishedAt
            });
        });

        return(
            <div>
                <div style={{ height: '1200px', margin: '0 auto', paddingTop: '15px' }}>
                    <HorizontalTimelineContent
                        content={articleData} />
                </div>
            </div>
        );
    }
}

export default NewsTimeline;
