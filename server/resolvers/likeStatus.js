export default {
  Query: {
    getLikeStatus: (parent, { inviteId }, { models }) =>
      models.LikeStatus.findOne({ where: { inviteId } }),
  },

  Mutation: {
    createLikeStatus: async (parent, args, { models }) => {
      try {
        console.log(Object.keys(models));
        await models.LikeStatus.create({ userId: 5, inviteId: 5 });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
