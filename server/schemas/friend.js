export default `
  type Friend {
    userId: Int!
    friendId: User!
  }

  type FriendResponse {
    ok: Boolean!
    data: Friend
    errors: [Error!]
  }

  type UserFriendsResponse {
    userid: Int!,
    username: String!,
    inviteid: Int!,
    description: String!,
    expired_at: String!,
    gameid: Int!,
    gamename: String!,
    gameicon: String!
  }

  type UserFriends {
    ok: Boolean!
    data: [UserFriendsResponse]
  }

  type Query {
    getUserFriends: UserFriends
  }

  type Mutation {
    createFriend(id: Int!): FriendResponse!
  }
`;
