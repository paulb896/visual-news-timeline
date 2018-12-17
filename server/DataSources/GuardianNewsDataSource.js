const { RESTDataSource } = require('apollo-datasource-rest'); 

module.exports = class GuardianNewsDataSource extends RESTDataSource {
    constructor(apiKey) {
      super();
      this.apiKey = apiKey;
      this.baseURL = 'https://content.guardianapis.com/';
    }
  
    parseArticle({ webTitle: articleBody, webTitle: headline, webPublicationDate: publishedAt, webUrl: url, id }) {
      return ({ articleBody, headline, publishedAt, url, id });
    }
  
    async getTopRecentArticles() {
      return (await this.get(`search?api-key=${this.apiKey}`))
        .response.results
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
      return (await this.get(`search?lang=${language}&from-date=${from}&to-date=${to}&q=${query}&api-key=${this.apiKey}`))
        .response.results
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
  
    async getArticleSources() {
      return (await this.get(`sections?api-key=${this.apiKey}`))
      .response.results;
    }
  }