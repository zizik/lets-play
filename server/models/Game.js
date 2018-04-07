export default (sequelize, DataTypes) => {
  const Channel = sequelize.define("game", {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
  });
  return Channel;
};
