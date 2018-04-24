export default `
  type Invite {
    id: Int!
    userId: Int!
    description: String
    gameId: Int!
    gameName: String!
  }

  type Query {
    getInvite(id: Int!): Invite!
    getAllInvites: [Invite]!
  }

  type InviteResponse {
    ok: Boolean!
    data: Invite
    errors: [Error!]
  }

  type Mutation {
    createInvite(gameId: Int!, description: String): InviteResponse!
    deleteInvite(id: Int!): InviteResponse!
  }
`;
