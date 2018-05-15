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
        const { userId: owner } = await models.Invite.findById(inviteId, { raw: true });
        if (owner === user.id) {
          throw new Error("You can't like your own invites");
        }
        await models.LikeStatus.create({ inviteId, userId: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        if (err.name === "SequelizeUniqueConstraintError") {
          return {
            ok: false,
            errors: [{ reason: "createLikeStatus", message: "You already like this invite" }],
          };
        }
        return {
          ok: false,
          errors: [{ reason: "createLikeStatus", message: err.message }],
        };
      }
    },
  },
};
