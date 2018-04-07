export default {
  Query: {
    getInvite: (parent, { id }, { models }) => models.Invite.findOne({ where: { id } }),
  },

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
