import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAlbumsQuery = gql`
  {
    albums {
      name
      id
    }
  }
`
class AlbumList extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="main">
        <ul id="album-list">
          <li>Test album name</li>
        </ul>
      </div>
    );
  }
}

export default graphql(getAlbumsQuery)(AlbumList);
