const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

const API_KEY = process.env.NEWS_API_KEY;

class NewsApi extends RESTDataSource {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.baseURL = 'https://newsapi.org/v2/';
  }

  parseArticle({ content: articleBody, title: headline, publishedAt, url }) {
    return ({ articleBody, headline, publishedAt, url, id: headline.replace(/ /g, '_')});
  }

  async getTopRecentArticles(country = 'us') {
    return (await this.get(`top-headlines?country=${country}&apiKey=${this.apiKey}`))
      .articles
      .map(this.parseArticle)
      .reduce((acc, article) => {
        if (article.id && !acc.currentKeys[article.id]) {
          acc.reducedResults.push(article);
          acc.currentKeys[article.id] = article.id;
        }

        return acc;
      }, {
        currentKeys: {},
        reducedResults: []
      }).reducedResults;
  }

  async getArticlesBetweenRange(from = '2018-12-09', to = '2018-12-18', query = '', language = 'en') {
    return (await this.get(`everything?language=${language}&from=${from}&to=${to}&q=${query}&apiKey=${this.apiKey}`))
      .articles.map(this.parseArticle)
      .reduce((acc, article) => {
        if (article.id && !acc.currentKeys[article.id]) {
          acc.reducedResults.push(article);
          acc.currentKeys[article.id] = article.id;
        }

        return acc;
      }, {
        currentKeys: {},
        reducedResults: []
      }).reducedResults;
  }

  async getArticleSources(language = 'en') {
    return (await this.get(`sources?language=${language}&apiKey=${this.apiKey}`)).sources;
  }
}

const typeDefs = gql`
  # NewsArticle based on https://schema.org/NewsArticle
  type NewsArticle {
    id: ID
    headline: String
    articleBody: String
    publishedAt: String
    url: String
  }

  type NewsArticleSource {
    id: ID
    name: String
    description: String
    url: String
  }

  type Language {
    id: ID
    name: String
  }

  type Query {
    # Get a list of most popular recent articles
    topRecentArticles: [NewsArticle]

    # Get all articles given parameters
    articles(from: String, to: String, searchText: String): [NewsArticle]

    # Get all article sources
    articleSources: [NewsArticleSource]

    # Get all supported languages
    languages: [Language]
  }
`;

const resolvers = {
  Query: {
    topRecentArticles: async (_source, _args, { dataSources }) => {
      return dataSources.newsApi.getTopRecentArticles();
    },
    articles: async(_source, { from, to, searchText}, { dataSources }) => {
      return dataSources.newsApi.getArticlesBetweenRange(from, to, searchText)
    },
    articleSources: async (_source, _args, { dataSources }) => {
      return dataSources.newsApi.getArticleSources();
    },
    languages: () => {
      return [
          { id: 'ar', name: 'ar' },
          { id: 'de', name: 'de' },
          { id: 'en', name: 'English' },
          { id: 'es', name: 'Spanish' },
          { id: 'fr', name: 'French' },
          { id: 'he', name: 'id' },
          { id: 'it', name: 'Italian' },
          { id: 'nl', name: 'id' },
          { id: 'no', name: 'id' },
          { id: 'pt', name: 'id' },
          { id: 'ru', name: 'Russian' },
          { id: 'se', name: 'id' },
          { id: 'ud', name: 'id' },
          { id: 'zh', name: 'id' }
      ]
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            newsApi: new NewsApi(API_KEY)
        };
    }
});

server.listen({port: 4000, path: '/graphql'}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});