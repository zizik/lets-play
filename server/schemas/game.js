export default `
  type Game {
    id: Int!
    name: String!
    icon: String
  }

  type Mutation {
    createGame(name: String!, icon: String!): Boolean!
  }
`;
