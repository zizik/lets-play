export default {
  Query: {
    getInvite: (parent, { id }, { models }) => models.Invite.findById(id),
    getAllInvites: (parent, args, { models }) => models.Invite.findAll(),
  },

  Mutation: {
    createInvite: async (parent, args, { models }) => {
      try {
        const invite = await models.Invite.create(args);
        return invite;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
