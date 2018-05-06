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
    friend: User!
    game: Game!
    invite: Invite!
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
