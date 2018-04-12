export default {
  Query: {
    getInvite: (parent, { id }, { models }) => models.Invite.findById(id),
    getAllInvites: (parent, args, { models }) => models.Invite.findAll(),
  },

  Mutation: {
    createInvite: async (parent, args, { models }) => {
      try {
        await models.Invite.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
