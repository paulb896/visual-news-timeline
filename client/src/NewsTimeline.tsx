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
        const articleData = this.articles.map((article, index) => {
            return ({
                component: (
                    <div className='container' key={index}>
                    <h1>{ article.headline }</h1>
                    <h4>{ article.publishedAt.split('T')[0] } { article.publishedAt.split('T')[1].split('Z')[0] }</h4>
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
                {/* Bounding box for the Timeline */}
                <div style={{ height: '1200px', margin: '0 auto' }}>
                    <HorizontalTimelineContent
                        content={articleData} />
                </div>
            </div>
        );
    }
}

export default NewsTimeline;
