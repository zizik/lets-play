import formatErrors from "../formatErrors";

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findById(id),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },

  Mutation: {
    createUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          data: user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
