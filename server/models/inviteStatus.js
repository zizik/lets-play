export default (sequelize, DataTypes) => {
  const InviteStatus = sequelize.define(
    "invite_status",
    {
      status: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    },
  );
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
