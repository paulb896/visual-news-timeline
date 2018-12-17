const MicrosoftNewsDataSource = require('./MicrosoftNewsDataSource');
const NewsApiDataSource = require('./NewsApiDataSource');
const GuardianNewsDataSource = require('./GuardianNewsDataSource');

/**
 * Build a News Data Source for a given type.
 *
 * @param {string} apiType News data source type.
 * @param {string} apiKey  News data source API key.
 */
module.exports = function buildNewsDataSource(apiType, apiKey) {
  const newsDataSources = {
    newsApi: () => new NewsApiDataSource(apiKey),
    guardian: () => new GuardianNewsDataSource(apiKey),
    microsoft: () => new MicrosoftNewsDataSource(apiKey)
  }

  if (!newsDataSources[apiType]) {
    throw new Error('Invalid News Api Type');
  }

  return newsDataSources[apiType]();
};