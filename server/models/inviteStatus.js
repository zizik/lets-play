export default (sequelize, DataTypes) => {
  const InviteStatus = sequelize.define("InviteStatus", {
    status: DataTypes.STRING,
  });
  InviteStatus.associate = models => {
    InviteStatus.belongsTo(models.Invite, {
      foreignKey: {
        name: "inviteId",
        field: "invite_id",
      },
    });
  };
  return InviteStatus;
};
