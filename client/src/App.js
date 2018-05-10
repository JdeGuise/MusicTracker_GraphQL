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
          <h1>MyMusic</h1>
          <h2>Artist List</h2>
          <ArtistList/>
          <h2>Album List</h2>
          <AlbumList/>
          <hr/>
          <div>
            <div class='form-divs'>
              <h2>New Artist</h2>
              <AddArtist/>
            </div>
            <div class='form-divs'>
              <h2>New Album</h2>
              <AddAlbum/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
