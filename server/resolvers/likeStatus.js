export default {
  Query: {
    getAllLikes: async (parent, { inviteId }, { models }) => {
      try {
        const likes = await models.LikeStatus.findAll({ where: { inviteId } });
        return {
          ok: true,
          data: likes,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: [{ reason: "getAllLikes", message: "" }],
        };
      }
    },
  },

  Mutation: {
    createLikeStatus: async (parent, { inviteId }, { models, user }) => {
      try {
        await models.LikeStatus.create({ inviteId, userId: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          return {
            ok: false,
            errors: [{ reason: "createLikeStatus", message: "You already like this invite" }],
          };
        }
        console.log(err);
        return {
          ok: false,
          errors: [{ reason: "createLikeStatus", message: "Cant add like" }],
        };
      }
    },
  },
};
