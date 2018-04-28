export default `
  type LikeStatus {
    inviteId: Int!
    userId: Int!
  }

  type LikeStatusResponse {
    ok: Boolean!
    data: [LikeStatus!]
    errors: [Error!]
  }

  type Query {
    getAllLikes(inviteId: Int!): LikeStatusResponse!
  }

  type Mutation {
    createLikeStatus: Boolean!
  }
`;
