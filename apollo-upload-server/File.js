const { gql, GraphQLUpload } = require('apollo-server-express');

const typeDefs = gql`
  enum ServiceProviderType {
    AMAZON
    AZURE
    LOCAL
  }

  input UserSelfieInput {
    id: String!
    provider: ServiceProviderType!
    bucketName: String
    name: String!
  }

  type UserSelfie {
    id: String!
    provider: ServiceProviderType!
    bucketName: String
    name: String!
  }

  type Query {
    _: String
  }

  type Mutation {
    uploadProposalDocumentSelfie(
      proposalId: String!
      checklistId: String!
      documentTypeId: String!
      data: UserSelfieInput!
      file: Upload!
    ): UserSelfie
  }
  scalar Upload
`;

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        _() {
            return "";
        }
    },
    Mutation: {
        async uploadProposalDocumentSelfie(parent, args) {
            console.log('Args', require('util').inspect(args, { depth: null }))
            
            // const { stream, filename, mimetype, encoding } = await args.file;

            // 1. Validate file metadata.

            // 2. Stream file contents into local filesystem or cloud storage:
            // https://nodejs.org/api/stream.html

            // 3. Record the file upload in your DB.
            // const id = await recordFile( … )

            return { ...args.data, id: "234982348487fdf80324" };
        }
    }
};

module.exports.typeDefs = typeDefs
module.exports.resolvers = resolvers