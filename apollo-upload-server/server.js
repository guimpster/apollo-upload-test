const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const express = require('express')
const bodyParser = require('body-parser')

module.exports.startServer = ({ routes = [], port = 3000, typeDefs, resolvers }) => {
    //const app = express();

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({ schema });

    //const jsonParser = bodyParser.json();

    //server.applyMiddleware({ app });

    //routes.forEach(({ method, path, fn }) => app[method](path, jsonParser, asyncMiddleware(fn)));

    server.listen({ port }, () => {
        console.log(`🚀  Graphql ready at http://localhost:${port}${server.graphqlPath}`);

        routes.forEach(({ method, path }) => {
            console.log(`🚀  Provider ready at [${method.toUpperCase()}] http://localhost:${port}${path}`);
        });
    });
};