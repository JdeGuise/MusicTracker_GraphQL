import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistQuery } from '../queries/queries';

class ArtistDetails extends Component {
  displayArtistDetails() {
    const { artist } = this.props.data;
    if(artist) {
      return(
        <div>
          <h1 className="music-detail"> { artist.name } </h1>
          <br/>

          <u><h2> Instruments </h2></u>
          <ul className="artist-instruments" >
            { artist.instruments.map(instrument => {
              return <li key={instrument}>{instrument}</li>
            })}
          </ul>
          <br/>

          <u><h2> Genres </h2></u>
          <ul className="artist-genres" >
            { artist.genres.map(genre => {
              return <li key={genre}>{genre}</li>
            })}
          </ul>
          <br/>

          <u><h2>Description</h2></u> <p> { artist.description } </p>
          <br/>

          <u><h2> Active Years </h2></u>
          <h3> { artist.activeYears } </h3>
          <br/>

          <u><h2>Associated Acts</h2></u>
          <ul className="artist-associatedActs" >
            { artist.associatedActs.map(act => {
              return <li key={act}>{act}</li>
            })}
          </ul>
          <br/>

          <u><h2>Artist URL</h2></u>
          <h3> { artist.url } </h3>
          <br/>

          <u><h2>Artist's Albums</h2></u>
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
