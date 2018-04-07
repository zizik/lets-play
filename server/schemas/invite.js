export default `
  type Invite {
    id: Int!
    userId: Int!
    description: String
    gameId: Int!
  }

  type Mutation {
    createInvite(userId: Int!, description: String!, gameId: Int!): Boolean!
  }
`;
