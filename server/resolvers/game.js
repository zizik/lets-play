export default {
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
