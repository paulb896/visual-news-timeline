const { RESTDataSource } = require('apollo-datasource-rest'); 

module.exports = class NewsApiDataSource extends RESTDataSource {
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