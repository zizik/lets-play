export default (sequelize, DataTypes) => {
  const Friend = sequelize.define("friend", {
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
  });
  return Friend;
};
