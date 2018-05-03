export default {
  Query: {
    getUserFriends: async (parent, args, { models, user }) => {
      const aaa = await models.sequelize.query(
        `
      select *
        from users uu
        join friends f on f.friend_id = uu.id
        join users u on u.id = f.user_id 
        join invites i on i.user_id = uu.id
        where u.id = 2
      union distinct
      select *
        from users uu
        join friends f on f.user_id = uu.id
        join users u on u.id = f.friend_id 
        join invites i on i.user_id = uu.id
        where u.id = 2`,
        { type: models.sequelize.QueryTypes.SELECT },
      );
      console.log(aaa);
      try {
        return {
          ok: true,
          data: aaa,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        };
      }
    },
  },
  Mutation: {
    createFriend: async (parent, args, { models, user }) => {
      try {
        let friendId = args.id;
        let userId = user.id;
        if (friendId < userId) {
          [friendId, userId] = [userId, friendId];
        }
        await models.Friend.create({ friendId, userId });
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
