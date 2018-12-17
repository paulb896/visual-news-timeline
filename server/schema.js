const { gql } = require('apollo-server');

module.exports = typeDefs = gql`
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