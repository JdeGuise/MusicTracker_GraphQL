import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistsQuery } from '../queries/queries';

//components
import ArtistDetails from './ArtistDetails';
var target;
var prevTarget;
class ArtistList extends Component {
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
  toggleOnArtist() {
    var albumDetails = document.getElementById('album-details');
    var artistDetails = document.getElementById('artist-details');
    var mainDiv = document.getElementById('main');

    if(artistDetails.style.display === 'none' || artistDetails.style.display === '') {
      artistDetails.style.display = 'inline';
      albumDetails.style.display = 'none';
      mainDiv.style.width = '59%';
    } else if(target === prevTarget){
      artistDetails.style.display = 'none';
      mainDiv.style.width = '100%';
    }
  }
  displayArtists() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading artists...</div>);
    } else {
      return data.artists.map(artist => {
        return(
          <li key={artist.id} onClick={
              (e) => {
                this.setState({ selected: artist.id }); this.toggleOnArtist();
              }} className="artistData"> { artist.name }
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="main">
        <ul id="artist-list">
          { this.displayArtists() }
        </ul>
        <ArtistDetails artistId={ this.state.selected }/>
      </div>
    );
  }
}

export default graphql(getArtistsQuery)(ArtistList);
