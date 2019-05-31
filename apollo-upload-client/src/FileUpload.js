import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const FileUpload = () => (
  <Mutation
    mutation={gql`
      mutation($file: Upload!) {
        uploadProposalDocument(
          checklistId: "5ced58171c9d44dc092acabc",
          data: {
            provider: AMAZON,
          },
          documentTypeId: "5cdf2dbc7ac06b0010471c11",
          proposalId: "5ced57c028f59db1387f4e32",
          file: $file
        ){
          id
          provider
          bucketName
          name
        }
      }
    `}
  >
    {mutate => (
      <input
        type="file"
        required
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => validity.valid && mutate({ variables: { file } })}
      />
    )}
  </Mutation>
);

export default FileUpload;
