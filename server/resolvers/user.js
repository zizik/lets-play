export default {
  Mutation: {
    createUser: async (parent, args, { models }) => {
      try {
        await models.User.create(args);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
