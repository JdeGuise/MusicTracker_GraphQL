import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArtistsQuery } from '../queries/queries';

class AddAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      releaseYear: "",
      artistId: ""
    };
  }
  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }
  displayArtists() {
    var data = this.props.data;
    if(data.loading) {
      return(
        <option disabled>Loading Artists... </option>
      )
    } else {
      return data.artists.map(artist => {
        return( <option key={artist.id} value={ artist.id }>{artist.name}</option>);
      });
    }
  }
  render() {
    return (
      <form id="add-album" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Album name: </label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Release Year: </label>
          <input type="text" onChange={ (e) => this.setState({ releaseYear: e.target.value })}/>
        </div>
        <div className="field">
          <label>Artist: </label>
          <select onChange={ (e) => this.setState({ artistId: e.target.value })}>
            <option>Select artist</option>
            { this.displayArtists() }
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getArtistsQuery)(AddAlbum)
