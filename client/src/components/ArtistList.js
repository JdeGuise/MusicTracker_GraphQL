import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getArtistsQuery = gql`
  {
    artists {
      name
      id
    }
  }
`
class ArtistList extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="main">
        <ul id="artist-list">
          <li>Test artist name</li>
        </ul>
      </div>
    );
  }
}

export default graphql(getArtistsQuery)(ArtistList);
