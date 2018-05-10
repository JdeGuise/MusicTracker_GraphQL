import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistQuery } from '../queries/queries';

class ArtistDetails extends Component {
  displayArtistDetails() {
    const { artist } = this.props.data;
    if(artist) {
      return(
        <div>
          <h1> { artist.name } </h1>
          <h3>Artist Site</h3> <p> { artist.url } </p>
          <h3> Active Years </h3> <p> { artist.activeYears } </p>

          <h3> Genres </h3>
          <ul className="artist-genres" >
            { artist.genres.map(genre => {
              return <li key={genre}>{genre}</li>
            })}
          </ul>

          <h3> Instruments </h3>
          <ul className="artist-instruments" >
            { artist.instruments.map(instrument => {
              return <li key={instrument}>{instrument}</li>
            })}
          </ul>

          <h3>Associated Acts</h3>
          <ul className="artist-associatedActs" >
            { artist.associatedActs.map(act => {
              return <li key={act}>{act}</li>
            })}
          </ul>

          <h3>Description</h3> <p> { artist.description } </p>

          <br/>
          <h4>All albums by this artist:</h4>
          <ul className="artist-albums">
            { artist.albums.map(item => {
              return <li key={ item.id }>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No artist selected...</div>
      )
    }
  }
  render() {
    return (
      <div id="artist-details">
        { this.displayArtistDetails() }
      </div>
    );
  }
}

export default graphql(getArtistQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.artistId
      }
    }
  }
})(ArtistDetails);
