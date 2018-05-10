import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getArtistsQuery, getAlbumsQuery, addArtistMutation } from '../queries/queries';

class AddArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      genres: [],
      instruments: [],
      url: "",
      activeYears: "",
      associatedActs: []
    };
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addArtistMutation({
      variables: {
        name: this.state.name,
        description: this.state.description,
        genres: this.state.genres,
        instruments: this.state.instruments,
        url: this.state.url,
        activeYears: this.state.activeYears,
        associatedActs: this.state.associatedActs
      },
      refetchQueries: [{ query: getArtistsQuery }]
    });
  }
  displayAlbums() {
    var data = this.props.data;
    if(data.loading) {
      return(
        <option disabled>Loading Albums... </option>
      )
    } else {
      return data.albums.map(album => {
        return( <option key={album.id} value={ album.id }>{album.name}</option>);
      });
    }
  }
  render() {
    return (
      <form id="add-artist" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Artist name: </label>
          <input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre (just one for now): </label>
          <input type="text" onChange={ (e) => this.setState({ genres: e.target.value.split('; ') })}/>
        </div>
        <div className="field">
          <label>Description: </label>
          <input type="text" onChange={ (e) => this.setState({ description: e.target.value })}/>
        </div>
        <div className="field">
          <label>Instruments: </label>
          <input type="text" onChange={ (e) => this.setState({ instruments: e.target.value.split('; ') })}/>
        </div>
        <div className="field">
          <label>URL: </label>
          <input type="text" onChange={ (e) => this.setState({ url: e.target.value })}/>
        </div>
        <div className="field">
          <label>Active Years: </label>
          <input type="text" onChange={ (e) => this.setState({ activeYears: e.target.value })}/>
        </div>
        <div className="field">
          <label>Associated Acts: </label>
          <input type="text" onChange={ (e) => this.setState({ associatedActs: e.target.value.split('; ') })}/>
        </div>
        <br/>
        <button>Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAlbumsQuery, { name: "getAlbumsQuery" }),
  graphql(addArtistMutation, { name: "addArtistMutation" })
)(AddArtist)
