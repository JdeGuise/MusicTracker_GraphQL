import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistsQuery } from '../queries/queries';

//components
import ArtistDetails from './ArtistDetails';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  toggleOnArtist() {
    document.getElementById('album-details').style.display = 'none';
    document.getElementById('artist-details').style.display = 'inline';
  }
  displayArtists() {
    var data = this.props.data;
    console.log(data.loading);
    if(data.loading) {
      return(<div>Loading artists...</div>);
    } else {
      console.log("artist data");
      console.log(data);
      return data.artists.map(artist => {
        return(
          <li key={artist.id} onClick={ (e) => { this.setState({ selected: artist.id }); this.toggleOnArtist();}}> { artist.name } </li>
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
