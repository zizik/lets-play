export default `
  type Invite {
    id: Int!
    userId: Int!
    description: String
    gameId: Int!
    expiredAt: String!
    game: Game!
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
    createInvite(gameId: Int!, expiredAt: String!, description: String): InviteResponse!
    deleteInvite(id: Int!): InviteResponse!
  }
`;
