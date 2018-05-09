import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumQuery } from '../queries/queries';

class AlbumDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="album-details">
        <p>Output album details here.</p>
      </div>
    );
  }
}

export default graphql(getAlbumQuery)(AlbumDetails);
