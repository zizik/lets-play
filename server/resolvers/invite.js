import formatErrors from "../formatErrors";

export default {
  Query: {
    getInvite: (parent, { id }, { models }) => models.Invite.findById(id),
    getAllInvites: (parent, args, { models, user }) =>
      models.Invite.findAll({ where: { userId: user.id } }),
  },

  Mutation: {
    createInvite: async (parent, args, { models, user }) => {
      try {
        const invite = await models.Invite.create({ ...args, userId: user.id }).then(inv =>
          inv.get({ plain: true }),
        );
        const game = await models.Game.findById(invite.gameId, { raw: true });
        return {
          ok: true,
          data: { ...invite, ...game },
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    deleteInvite: async (parent, { id }, { models }) => {
      try {
        const isDeleted = await models.Invite.destroy({ where: { id } });
        if (!isDeleted) {
          throw new Error("Can't find invite with this id");
        }
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: [{ reason: "Delete invite", message: err.message }],
        };
      }
    },
  },

  // Invite: {
  //   game: (parent, args, { models }) => models.Game.findById(parent.gameId),
  // },
};
