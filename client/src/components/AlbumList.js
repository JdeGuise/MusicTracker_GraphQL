import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';

//components
import AlbumDetails from './AlbumDetails';
var target;
var prevTarget;
class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
    document.addEventListener('click', function(e) {
      prevTarget = target;
      e = e || window.event;
      target = e.target || e.srcElement;
    }, false);
  }
  toggleOnAlbum() {
    var albumDetails = document.getElementById('album-details');
    var artistDetails = document.getElementById('artist-details');
    var mainDiv = document.getElementById('main');

    if(albumDetails.style.display === 'none' || albumDetails.style.display === '') {
      albumDetails.style.display = 'inline';
      artistDetails.style.display = 'none';
      mainDiv.style.width = '59%';
    } else if(target === prevTarget){
      albumDetails.style.display = 'none';
      mainDiv.style.width = '100%';
    }
  }
  displayAlbums() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading albums...</div>);
    } else {
      return data.albums.map(album => {
        return(
          <li key={album.id} onClick={ (e) => {
            this.setState({
              selected: album.id
            }); this.toggleOnAlbum();
          }}> { album.name }
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div id="album-main">
        <h2>Album List</h2>
        <ul id="album-list">
          { this.displayAlbums() }
        </ul>
        <AlbumDetails albumId={ this.state.selected } />
      </div>
    );
  }
}

export default graphql(getAlbumsQuery)(AlbumList);
