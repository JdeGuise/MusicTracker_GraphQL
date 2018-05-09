import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';

//components
import AlbumDetails from './AlbumDetails';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  displayAlbums() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading albums...</div>);
    } else {
      return data.albums.map(album => {
        return(
          <li key={album.id} onClick={ (e) => { this.setState({ selected: album.id })}}> { album.name } </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="main">
        <ul id="album-list">
          { this.displayAlbums() }
        </ul>
        <AlbumDetails albumId={ this.state.selected } />
      </div>
    );
  }
}

export default graphql(getAlbumsQuery)(AlbumList);
