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
    createLikeStatus: async (parent, args, { models }) => {
      try {
        await models.LikeStatus.create({ userId: 5, inviteId: 5 });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
