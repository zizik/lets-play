export default `
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Boolean!
  }
`;
