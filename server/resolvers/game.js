export default {
  Query: {
    getGame: (parent, { id }, { models }) => models.Game.findOne({ where: { id } }),
    getAllGames: (parent, args, { models }) => models.Game.findAll(),
  },

  Mutation: {
    createGame: async (parent, args, { models }) => {
      try {
        await models.Game.create(args);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
