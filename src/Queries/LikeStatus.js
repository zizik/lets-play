import gql from "graphql-tag";

export const ADD_LIKE_STATUS = gql`
  mutation($inviteId: Int!) {
    createLikeStatus(inviteId: $inviteId) {
      ok
      errors {
        reason
        message
      }
    }
  }
`;
