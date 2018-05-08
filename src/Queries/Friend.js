import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const GET_USER_FRIENDS = gql`
  query {
    getUserFriends {
      ok
      data {
        friend {
          id
          name
        }
        invite {
          id
          description
          expiredAt
        }
        game {
          name
          icon
        }
      }
    }
  }
`;
