export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },

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
