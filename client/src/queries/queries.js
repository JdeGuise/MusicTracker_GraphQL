import {gql} from 'apollo-boost';

const getArtistsQuery = gql`
  {
    artists {
      name
      id
    }
  }
`

const getAlbumsQuery = gql`
  {
    albums {
      name
      id
    }
  }
`

const addAlbumMutation = gql`
  mutation($name: String!, $releaseYear: Int!, $artistId: ID!) {
    addAlbum(name: $name, releaseYear: $releaseYear, artistId: $artistId) {
      name
      id
    }
  }
`

const addArtistMutation = gql`
  mutation($name: String!, $description: String!, $genres: [String]!, $instruments: [String]!, $url: String!, $activeYears: String!, $associatedActs: [String]!) {
    addArtist(name: $name, description: $description, genres: $genres, instruments: $instruments, url: $url, activeYears: $activeYears, associatedActs: $associatedActs) {
      name
      id
    }
  }
`

export { getArtistsQuery, getAlbumsQuery, addAlbumMutation, addArtistMutation };
