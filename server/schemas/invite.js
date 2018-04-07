export default `
  type Invite {
    id: Int!
    userId: Int!
    description: String
    gameId: Int!
  }

  type Query {
    getInvite(id: Int!): Invite!
  }

  type Mutation {
    createInvite(userId: Int!, gameId: Int!, description: String): Boolean!
  }
`;
