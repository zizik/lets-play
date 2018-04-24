import gql from "graphql-tag";

export const getAllInvites = gql`
  query {
    getAllInvites {
      id
      userId
      description
      game {
        name
        icon
      }
    }
  }
`;

export const deleteInviteMutation = gql`
  mutation($id: Int!) {
    deleteInvite(id: $id) {
      ok
      errors {
        reason
        message
      }
    }
  }
`;

export const createInviteMutation = gql`
  mutation($description: String!, $gameId: Int!) {
    createInvite(description: $description, gameId: $gameId) {
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
