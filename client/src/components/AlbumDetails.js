import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumQuery } from '../queries/queries';

class AlbumDetails extends Component {
  displayAlbumDetails() {
    const { album } = this.props.data;
    if(album) {
      return(
        <div>
          <h2> { album.name } </h2>
          <h3> { album.artist.name } </h3>
          <h4> Year released: { album.releaseYear } </h4>
          <h5>All albums by this artist:</h5>
          <h5><ul className="other-albums">
            { album.artist.albums.map(item => {
              return <li key={ item.id }>{item.name}</li>
            })}
          </ul></h5>
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
