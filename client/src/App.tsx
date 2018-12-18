import * as React from 'react';
import './App.css';
import Article from './Article';
import ArticlesService from './ArticlesService';
import NewsTimeline from './NewsTimeline';

class App extends React.Component<any, any> {
    private articlesService : ArticlesService;
 
    public constructor(props: any) {
        super(props);

        this.state = {
            articleDateFrom: '2018-12-11',
            articleDateTo: new Date().toISOString().split('T')[0],
            articleSearchText: 'mars',
            articles: [],
            previous: 0,
            value: 0
        };
        this.articlesService = new ArticlesService('http://localhost:4000/graphql');
        this.handleArticleSearchTextChange = this.handleArticleSearchTextChange.bind(this);
        this.handleArticleDateFromChange = this.handleArticleDateFromChange.bind(this);
        this.handleArticleDateToChange = this.handleArticleDateToChange.bind(this);
        this.updateState = this.updateState.bind(this);

        this.loadArticles(
            this.state.articleSearchText,
            this.state.articleDateFrom,
            this.state.articleDateTo
        );
    }

    /**
     * Load all articles from the articles service.
     */
    public loadArticles(searchText, dateFrom, dateTo) {
        this.articlesService.getArticles(
            searchText,
            dateFrom,
            dateTo
        ).then(articles => {
            this.setState({ articles })
        });
    }

    /**
     * Update message state when article input updates.
     * 
     * @param event Article message change event.
     */
    public handleArticleSearchTextChange(event: any) {
        const articleSearchText = event.currentTarget.value;
        this.setState({ articleSearchText });

        this.loadArticles(
            articleSearchText,
            this.state.articleDateFrom,
            this.state.articleDateTo
        );
    }

    /**
     * Update message state when article input updates.
     * 
     * @param event Article message change event.
     */
    public handleArticleDateFromChange(event: any) {
        const articleDateFrom = event.currentTarget.value;

        this.setState({ articleDateFrom });

        this.loadArticles(
            this.state.articleSearchText,
            articleDateFrom,
            this.state.articleDateTo
        );
    }

    /**
     * Update message state when article input updates.
     * 
     * @param event Article message change event.
     */
    public handleArticleDateToChange(event: any) {
        const articleDateTo = event.currentTarget.value;

        this.setState({ articleDateTo });

        this.loadArticles(
            this.state.articleSearchText,
            this.state.articleDateFrom,
            articleDateTo
        );
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">News Article Timeline</h1>

                    <div className="search-article">
                    Search
                    <input
                        className="search-article_text"
                        type="text"
                        onChange={ this.handleArticleSearchTextChange }
                        value={this.state.articleSearchText} />
                    From
                    <input
                        className="search-date-from"
                        type="text"
                        onChange={ this.handleArticleDateFromChange }
                        value={this.state.articleDateFrom} />
                    To
                    <input
                        className="search-date-to"
                        type="text"
                        onChange={ this.handleArticleDateToChange }
                        value={this.state.articleDateTo} />
                </div>
                </header>

                { this.renderNewsTimeline(this.state.articles) }
                <div className="articles" hidden={true}>
                {
                    this.state.articles.map((article: any, index: number) => {
                        return (
                            <Article
                                key={ article.id }
                                id={ article.id }
                                articleBody={ article.articleBody }
                                publishedAt={ article.publishedAt }
                                url={ article.url }
                                headline={ article.headline } />
                        );
                    })
                }
                </div>
            </div>
        );
    }

    private renderNewsTimeline(articles) {
        return(<NewsTimeline articles={ articles } />);
    }

    private updateState(index) {
        this.setState({ value: index, previous: this.state.value });
    }
}

export default App;
