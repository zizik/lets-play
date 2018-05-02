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

  type Mutation {
    createFriend(id: Int!): FriendResponse!
  }
`;
