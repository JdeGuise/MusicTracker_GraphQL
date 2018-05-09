import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';

//components
import ArtistDetails from './ArtistDetails';

class AlbumList extends Component {
  displayAlbums() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading books...</div>);
    } else {
      return data.albums.map(album => {
        return(
          <li key={album.id}> { album.name } </li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="main">
        <ul id="album-list">
          { this.displayAlbums() }
        </ul>
      </div>
    );
  }
}

export default graphql(getAlbumsQuery)(AlbumList);
