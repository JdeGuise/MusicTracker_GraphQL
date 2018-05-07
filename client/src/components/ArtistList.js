import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistsQuery } from '../queries/queries';

class ArtistList extends Component {
  displayArtists() {
    var data = this.props.data;
    if(data.loading) {
      return(<div>Loading artists...</div>);
    } else {
      return data.artists.map(artist => {
        return(
          <li key={artist.id}> { artist.name } </li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="main">
        <ul id="artist-list">
          { this.displayArtists() }
        </ul>
      </div>
    );
  }
}

export default graphql(getArtistsQuery)(ArtistList);
