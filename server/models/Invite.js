export default (sequelize, DataTypes) => {
  const Invite = sequelize.define("channel", {
    discription: DataTypes.STRING,
  });
  Invite.associate = models => {
    Invite.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
      },
    });
    Invite.belongsTo(models.Game, {
      foreignKey: {
        name: "gameId",
        field: "game_id",
      },
    });
    Invite.belongsToMany(models.LikeStatus, {
      through: "invite_status",
      foreignKey: { name: "inviteId", field: "invite_id" },
    });
  };
  return Invite;
};
