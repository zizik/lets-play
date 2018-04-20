export default `
  type Invite {
    id: Int!
    userId: Int!
    description: String
    gameId: Int!
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
    createInvite(userId: Int!, gameId: Int!, description: String): InviteResponse!
  }
`;
