import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumQuery } from '../queries/queries';

class AlbumDetails extends Component {
  displayAlbumDetails() {
    const { album } = this.props.data;
    if(album) {
      return(
        <div>
          <h1 class="music-detail"> { album.name } </h1>
          <br/>

          <u><h2> Artist</h2></u>
          <h3>{ album.artist.name } </h3>
          <br/>

          <u><h2> Year released </h2></u>
          <h3> { album.releaseYear } </h3>
          <br/>

          <u><h2>Artist's Albums</h2></u>
          <ul className="other-albums">
            { album.artist.albums.map(item => {
              return <li key={ item.id }>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No album selected...</div>
      )
    }
  }
  render() {
    return (
      <div id="album-details">
        { this.displayAlbumDetails() }
      </div>
    );
  }
}

export default graphql(getAlbumQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.albumId
      }
    }
  }
})(AlbumDetails);
