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
    gameid: Int!,
    description: String!,
    expired_at: String!
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
