import React, { Component } from 'react';

import './App.css';

import { ApolloProvider } from "react-apollo";
import FileUpload from './FileUpload'
import client from './ApolloClient'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>Apollo Upload Client <span role='img' aria-label='Emoji'>🚀</span></h2>
        </div>
        <FileUpload />
        <style>{`
          html {
            font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
              sans-serif;
            background-color: white;
          }
          body {
            margin: 2em;
          }
        `}</style>
      </ApolloProvider>

    );
  }
}

export default App;
