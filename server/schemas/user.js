export default `
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: Int!): User!
    getAllUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Boolean!
  }
`;
