export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });
  User.associate = models => {
    User.belongsToMany(models.Invite, {
      through: "like_statuses",
      foreignKey: { name: "userId", field: "user_id" },
    });
  };
  return User;
};
