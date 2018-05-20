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
  uri: 'http://jdowned.madhacker.biz:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <ArtistList/>
          <br/>
          <AlbumList/>
          <br/>
          <hr/>
          <br/>
          <div>
            <div className='form-divs'>
              <AddArtist/>
            </div>
            <br/>
            <br/>
            <div className='form-divs'>
              <AddAlbum/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
