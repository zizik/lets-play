export default {
  Mutation: {
    createStatus: async (parent, args, { models }) => {
      try {
        await models.InviteStatus.create(args);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
