import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const FileUpload = () => (
  <Mutation
    mutation={gql`
      mutation($file: Upload!) {
        singleUpload(id: "5b9042af593d1b731f5bc298", file: $file) {
          filename
          mimetype
          encoding
          id
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
