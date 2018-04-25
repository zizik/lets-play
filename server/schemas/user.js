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
  
  type UserResponse {
    ok: Boolean!
    data: User
    errors: [Error!]
  }
  
  type Tokens  {
    accessToken: String!
    refreshToken: String!
  }
  
  type LoginResponse {
    ok: Boolean!
    data: Tokens
    errors: Error!
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): UserResponse!
    login(email: String!, password: String): LoginResponse!
  }
  `;
