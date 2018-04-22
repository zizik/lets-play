export default (sequelize, DataTypes) => {
  const Invite = sequelize.define(
    "invite",
    {
      description: DataTypes.STRING,
      created_at: DataTypes.DATE,
      expired_at: DataTypes.DATE,
    },
    {
      timestamps: false,
    },
  );
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
    Invite.belongsToMany(models.User, {
      through: "like_statuses",
      foreignKey: { name: "inviteId", field: "invite_id" },
    });
  };
  return Invite;
};
