export default `
  type LikeStatus {
    inviteId: Int!
    userId: Int!
  }

  type Query {
    getLikeStatus(inviteId: Int!): Boolean!
  }

  type Mutation {
    createLikeStatus: Boolean!
  }
`;
