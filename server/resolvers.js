const { gql } = require('apollo-server');

module.exports = resolvers = {
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