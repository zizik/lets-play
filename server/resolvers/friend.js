export default {
  Query: {
    getUserFriends: async (parent, args, { models, user }) => {
      try {
        const query = `
        WITH user_friends as (
          select
          u.id,
          u.name
          from friends f
          join users u on u.id = f.user_id or u.id = f.friend_id
          where (f.user_id = :id or f.friend_id = :id) and not u.id = :id
        ), friends_invites as (
          select
          i.id as invite_id,
          i.user_id,
          i.game_id,
          i.expired_at,
          i.description,
          g.name,
          g.icon,
          l.user_id as user_liked
          from invites i
          join games g on g.id = i.game_id
          left join like_statuses l on l.invite_id = i.id
        )
        select
          user_friends.id as "id",
          user_friends.name as "name",
          friends_invites.invite_id as "invites.id",
          friends_invites.game_id as "invites.gameId",
          friends_invites.expired_at as "invites.expiredAt",
          friends_invites.description as "invites.description",
          friends_invites.name as "invites.game.name",
          friends_invites.icon as "invites.game.icon",
          friends_invites.user_liked as "invites.usersLikes.id"
        from user_friends join friends_invites on user_friends.id = friends_invites.user_id;
      `;

        const options = {
          hasJoin: true,
          replacements: { id: user.id },
          model: models.User,
          include: [
            {
              model: models.Invite,
              as: "invites",
              include: [{ model: models.Game }, { model: models.User, as: "usersLikes" }],
            },
          ],
        };
        // eslint-disable-next-line no-underscore-dangle
        models.User._validateIncludedElements(options);

        const friends = await models.sequelize.query(query, options);
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
