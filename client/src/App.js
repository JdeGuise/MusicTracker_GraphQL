import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import AlbumList from './components/AlbumList';
import ArtistList from './components/ArtistList';
import AddAlbum from './components/AddAlbum';
import AddArtist from './components/AddArtist';
// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Goose's List of Music</h1>
          <h2>Artist List</h2>
          <ArtistList/>
          <h2>Album List</h2>
          <AlbumList/>
          <h2>Add Artist</h2>
          <AddArtist/>
          <h2>Add Album</h2>
          <AddAlbum/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
