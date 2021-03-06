export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    "game",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      icon: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    },
  );
  return Channel;
};
