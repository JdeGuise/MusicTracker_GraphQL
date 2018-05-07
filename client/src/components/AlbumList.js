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
