import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistQuery } from '../queries/queries';

class ArtistDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="artist-details">
        <p>Output artist details here.</p>
      </div>
    );
  }
}

export default graphql(getArtistQuery)(ArtistDetails);
