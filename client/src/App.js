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
        <div className="main">
          <h1>Goose's List of Music</h1>
          <hr/>
          <h2>Artist List</h2>
          <ArtistList/>
          <br/>
          <h2>Album List</h2>
          <AlbumList/>
          <br/>
          <br/>
          <h2>Add Artist</h2>
          <AddArtist/>
          <br/>
          <h2>Add Album</h2>
          <AddAlbum/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
