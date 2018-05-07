import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>Goose's List of Music</h1>
          <AlbumList/>
          <ArtistList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
