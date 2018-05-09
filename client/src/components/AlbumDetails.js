import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumQuery } from '../queries/queries';

class AlbumDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="album-details">
        <p>Album details here.</p>
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
