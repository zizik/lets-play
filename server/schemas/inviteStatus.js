export default `
  type InviteStatus {
    id: Int!
    status: String!
  }

  type Query {
    getInviteStatus(id: Int!): InviteStatus!
  }

  type Mutation {
    createStatus(status: String!): Boolean!
  }
`;
