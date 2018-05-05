export default {
  Query: {
    getUserFriends: async (parent, args, { models, user }) => {
      const aaa = await models.sequelize.query(
        `
        select 
          fl.id as userId,
          fl.name as userName,
          i.id as inviteId,
          i.game_id as gameId,
          i.description,
          i.expired_at
        from (
          select distinct 
            u.id,
            u.name
          from friends f
          join users u on (u.id = f.user_id or u.id = f.friend_id) and not u.id = ?
          ) as fl 
            join invites i on fl.id = i.user_id
        `,
        { type: models.sequelize.QueryTypes.SELECT, replacements: [user.id] },
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
