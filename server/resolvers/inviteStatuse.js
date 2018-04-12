export default {
  Query: {
    getInviteStatus: (parent, { id }, { models }) => models.InviteStatus.findOne({ where: { id } }),
  },

  Mutation: {
    createStatus: async (parent, args, { models }) => {
      try {
        await models.InviteStatus.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
