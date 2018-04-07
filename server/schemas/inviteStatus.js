export default `
  type InviteStatus {
    id: Int!
    status: String!
  }

  type Mutation {
    createStatus(status: String!): Boolean!
  }
`;
