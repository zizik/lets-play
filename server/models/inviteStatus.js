export default (sequelize, DataTypes) => {
  const InviteStatus = sequelize.define("InviteStatus", {
    status: {
      type: DataTypes.STRING,
      unique: true,
    },
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
