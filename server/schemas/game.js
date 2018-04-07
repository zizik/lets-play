export default `
  type Game {
    id: Int!
    name: String!
    icon: String
  }

  type Query {
    getGame: Game!
    getAllGames: [Game!]!
  }

  type Mutation {
    createGame(name: String!, icon: String = "No icon"): Boolean!
  }
`;
