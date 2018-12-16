import ApolloClient, { InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

class ArticlesService {
    private client : ApolloClient<InMemoryCache>;
    private ARTICLES_QUERY = gql`
        query ($searchText: String, $from: String, $to: String) {
            articles (searchText: $searchText, from: $from, to: $to) {
                headline
                articleBody
                publishedAt
                url
                id
            }
        }
    `;

    /**
     * @param serverBaseUrl
     */
    constructor(serverBaseUrl: string) {
        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: serverBaseUrl
        });
    }

    /**
     * Get a list of articles.
     * 
     * @returns Promise
     */
    public getArticles(searchText: string, from: string, to: string) {
        return this.client.query({
            query: this.ARTICLES_QUERY,
            variables: {
                from,
                searchText,
                to
            }
        })
        .then(res => {
            // @ts-ignore
            return res.data.articles;
        });
    }
}

export default ArticlesService;