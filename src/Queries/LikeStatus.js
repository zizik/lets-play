import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
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
