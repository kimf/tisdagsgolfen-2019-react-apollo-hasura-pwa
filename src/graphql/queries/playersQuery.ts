import gql from "graphql-tag";

const players = gql`
  query {
    players: users {
      id
      name
      photo
    }
  }
`;

export default players;
