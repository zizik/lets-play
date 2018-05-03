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
    name: String
    game_id: Int
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
