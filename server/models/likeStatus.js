export default (sequelize, DataTypes) => {
  const LikeStatus = sequelize.define("like", {});
  LikeStatus.associate = models => {
    LikeStatus.belongsToMany(models.Invite, {
      through: "invite_status",
      foreignKey: { name: "inviteId", field: "invite_id" },
    });
    LikeStatus.belongsToMany(models.User, {
      through: "user_status",
      foreignKey: { name: "userId", field: "user_id" },
    });
  };
  return LikeStatus;
};
