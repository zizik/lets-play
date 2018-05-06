import gql from "graphql-tag";

export const GET_USER_FRIENDS = gql`
  query {
    getUserFriends {
      ok
      data {
        userid
        username
        inviteid
        description
        expired_at
        gameid
        gamename
        gameicon
      }
    }
  }
`;
