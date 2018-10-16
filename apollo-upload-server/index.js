const { typeDefs, resolvers } = require('./File');
const { startServer } = require('./server');


startServer({ port: 3005, typeDefs, resolvers });
