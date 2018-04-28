export default (sequelize, DataTypes) => {
  const InviteStatus = sequelize.define(
    "like_statuses",
    {},
    {
      timestamps: false,
    },
  );
  return InviteStatus;
};
