const { ApolloServer } = require('apollo-server');
const NEWS_API_TYPE = process.env.NEWS_API_TYPE || 'newsApi';
const API_KEY = process.env.NEWS_API_KEY;
const buildNewsDataSource = require('./DataSources/NewsDataSourceFactory');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            newsApi: buildNewsDataSource(NEWS_API_TYPE, API_KEY)
        };
    }
});

server.listen({port: 4000, path: '/graphql'}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});