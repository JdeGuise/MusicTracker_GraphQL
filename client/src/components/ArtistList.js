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
  displayArtists() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading artists...</div>);
    } else {
      return data.artists.map(artist => {
        return(
          <li key={artist.id} onClick={ (e) => { this.setState({ selected: artist.id })}}> { artist.name } </li>
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
