export default `
  type Game {
    id: Int!
    name: String!
    icon: String
  }

  type Query {
    getGame(id: Int!): Game!
    getAllGames: [Game!]!
  }

  type Mutation {
    createGame(name: String!, icon: String): Boolean!
  }
`;
