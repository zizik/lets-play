import formatErrors from "../formatErrors";

export default {
  Query: {
    getInvite: (parent, { id }, { models }) => models.Invite.findById(id),
    getAllInvites: (parent, args, { models }) => models.Invite.findAll(),
  },

  Mutation: {
    createInvite: async (parent, args, { models }) => {
      try {
        const invite = await models.Invite.create(args);
        return {
          ok: true,
          data: invite,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },

  Invite: {
    game: (parent, args, { models }) => models.Game.findById(parent.gameId),
  },
};
