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

export const GET_GAME = gql`
  query($id: Int!) {
    getGame(id: $id) {
      id
      name
      icon
    }
  }
`;
