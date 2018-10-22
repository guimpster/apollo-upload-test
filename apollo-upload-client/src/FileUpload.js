import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const FileUpload = () => (
  <Mutation
    mutation={gql`
      mutation($file: Upload!) {
        uploadProposalDocumentSelfie(
          proposalId: "5b9042af593d1b731f5bc298"
          checklistId: "5b9042b91c9d4411472989ab"
          documentTypeId: "5b8edd79aa7be2847a4f8863"
          data: {
            id: "5b8f0cdb53ebce1d98d5b26f"
            provider: AMAZON
            bucketName: "photos-uploader"
            name: "testeA.jpg"
          }
          file: $file
        ) {
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
