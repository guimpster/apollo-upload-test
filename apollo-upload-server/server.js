const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const express = require('express')
const bodyParser = require('body-parser')
const { mergeSchemas, makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools')
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const FormData = require('form-data')
const { createUploadLink } = require('@kapmug/apollo-upload-client')
const gql = require('graphql-tag');
const { ApolloLink } = require('apollo-link');
const { onError } = require('apollo-link-error');

const addService = async (service) => {
    const link = new HttpLink({ uri: `http://${service}/graphql`, fetch });

    const executableSchema = await introspectSchema(link)
        .then(schema => makeRemoteExecutableSchema({ schema, link }))
        .catch(err => console.log(`ERROR: ${service}`));

    return executableSchema;
};

module.exports.startServer = async ({ routes = [], port = 3000, typeDefs, resolvers }) => {
    const app = express();

    const schema = mergeSchemas({
        schemas: [
            await addService('localhost:3004')
        ],
        resolvers: mergeInfo => ({
            Mutation: {
                async uploadProposalDocumentSelfie(root, args, context, info) {
                    const client = new ApolloClient({
                        link: createUploadLink({
                            uri: 'http://localhost:3000/graphql',
                            serverFormData: FormData,
                            fetch
                        }),
                        cache: new InMemoryCache()
                    })

                    return await client.mutate({
                        // if you add 'request' in your context by default
                        // you can:
                        mutation: gql(context.req.body.query),
                        variables: args
                    })
                }
            }
        })
    });

    const server = new ApolloServer({ schema, context: async ({ req }) => ({ req }) });

    const jsonParser = bodyParser.json();

    server.applyMiddleware({ app });

    routes.forEach(({ method, path, fn }) => app[method](path, jsonParser, asyncMiddleware(fn)));

    app.listen({ port }, () => {
        console.log(`🚀  Graphql ready at http://localhost:${port}${server.graphqlPath}`);

        routes.forEach(({ method, path }) => {
            console.log(`🚀  Provider ready at [${method.toUpperCase()}] http://localhost:${port}${path}`);
        });
    });
};