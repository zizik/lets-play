import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const GET_USER_FRIENDS = gql`
  query {
    getUserFriends {
      ok
      data {
        id
        name
        invites {
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
    }
  }
`;
