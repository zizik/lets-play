export default {
  Query: {
    // getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getUser: (parent, { id }, { models }) => models.User.findById(id),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },

  Mutation: {
    createUser: async (parent, args, { models }) => {
      try {
        await models.User.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
