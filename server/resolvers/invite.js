export default {
  Mutation: {
    createInvite: async (parent, args, { models }) => {
      try {
        await models.Invite.create(args);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
