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

export { getArtistsQuery, getAlbumsQuery };
