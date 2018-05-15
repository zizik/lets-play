import gql from "graphql-tag";

export const GET_ALL_INVITES = gql`
  query {
    getAllInvites {
      id
      description
      expiredAt
      game {
        name
        icon
      }
      usersLikes {
        id
      }
    }
  }
`;

export const DELETE_INVITE_MUTATION = gql`
  mutation($id: Int!) {
    deleteInvite(id: $id) {
      ok
      data {
        id
      }
      errors {
        reason
        message
      }
    }
  }
`;

export const CREATE_INVITE_MUTATION = gql`
  mutation($description: String!, $gameId: Int!, $expiredAt: String!) {
    createInvite(description: $description, gameId: $gameId, expiredAt: $expiredAt) {
      ok
      data {
        id
        description
        gameId
        userId
      }
      errors {
        reason
        message
      }
    }
  }
`;
