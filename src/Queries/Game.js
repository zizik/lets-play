import gql from "graphql-tag";

export const GET_ALL_GAMES = gql`
  query {
    getAllGames {
      id
      name
      icon
    }
  }
`;
