export default {
  Mutation: {
    createFriend: async (parent, { friendId }, { models, user }) => {
      try {
        await models.Friend.create({ friendId, userId: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        };
      }
    },
  },
};
