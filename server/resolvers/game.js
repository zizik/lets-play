export default {
  Query: {
    getGame: (parent, { id }, { models }) => models.Game.findOne({ where: { id } }),
    getAllGames: (parent, args, { models }) => models.Game.findAll(),
  },

  Mutation: {
    createGame: async (parent, args, { models }) => {
      try {
        const game = await models.Game.create(args);
        return game;
      } catch (err) {
        return false;
      }
    },
  },
};
