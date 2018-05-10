import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getArtistsQuery, getAlbumsQuery, addAlbumMutation } from '../queries/queries';

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
    this.props.addAlbumMutation({
      variables: {
        name: this.state.name,
        releaseYear: this.state.releaseYear,
        artistId: this.state.artistId
      },
      refetchQueries: [{query: getAlbumsQuery}]
    });
    document.getElementById('add-album').reset();
  }
  displayArtists() {
    var data = this.props.getArtistsQuery;
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
        <br/>
        <button>Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getArtistsQuery, { name: "getArtistsQuery" }),
  graphql(addAlbumMutation, { name: "addAlbumMutation" })
)(AddAlbum)
