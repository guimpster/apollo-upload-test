const { gql, GraphQLUpload } = require('apollo-server');

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    id: String
  }

  type Query {
      _: String
  }

  type Mutation {
    singleUpload(file: Upload!, id: String): File!
  }
`;

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        _() {
            return "";
        }
    },
    Mutation: {
        async singleUpload(parent, { file, id }) {
            console.log('File', require('util').inspect(file, { depth: null }))
            console.log('Id: ', id);
            
            const { stream, filename, mimetype, encoding } = await file;

            // 1. Validate file metadata.

            // 2. Stream file contents into local filesystem or cloud storage:
            // https://nodejs.org/api/stream.html

            // 3. Record the file upload in your DB.
            // const id = await recordFile( … )

            return { stream, filename, mimetype, encoding, id };
        }
    }
};

module.exports.typeDefs = typeDefs
module.exports.resolvers = resolvers