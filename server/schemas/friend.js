export default `
  type Friend {
    userId: Int!
    friendId: User!
  }

  type FriendInfo {
    id: Int!
    name: String!
    invites: [Invite!]
  }
  
  type UserFriendsResponse {
    id: Int!,
    name: String!
    invites: [Invite]
  }

  
  type UserFriends {
    ok: Boolean!
    data: [UserFriendsResponse!]
  }
  
  type Query {
    getUserFriends: UserFriends
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
