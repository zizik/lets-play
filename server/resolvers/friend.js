export default {
  Query: {
    getUserFriends: async (parent, args, { models, user }) => {
      const friends = await models.sequelize.query(
        `
        select 
          fl.id as "friend.id",
          fl.name as "friend.name",
          i.id as "invite.id",
          i.description as "invite.description",
          i.expired_at as "invite.expiredAt",
          g.id as "game.id",
          g.name as "game.name",
          g.icon as "game.icon"
        from (
          select distinct 
          u.id,
          u.name
        from friends f
          join users u on (u.id = f.user_id or u.id = f.friend_id) and not u.id = ?
        ) as fl 
          join invites i on fl.id = i.user_id
          join games g on g.id = i.game_id 
        `,
        { replacements: [user.id], nest: true },
      );
      console.log(friends);
      try {
        return {
          ok: true,
          data: friends,
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
