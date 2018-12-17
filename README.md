# Visual News Timeline

A tool that renders news articles on a modifiable timeline, also filtered by language, source, and search text. Uses a a configurable data source, go to [News API](https://newsapi.org/) or [Guardian API](https://open-platform.theguardian.com/access/) to get an API key, which is [configured with server environment variables](./server#setup).

## [React Web Client](./client) Calls the GraphQL server to get News data.

## [GraphQL Server](./server) Exposes a GraphQL endpoint containing queries for fetching News Articles.
