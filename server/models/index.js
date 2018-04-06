import Sequelize from "sequelize";

const sequelize = new Sequelize("LetsPlay", "zizik", "", {
  dialect: "postgres",
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import("./user"),
  UserStatuses: sequelize.import("./userStatuses"),
  Game: sequelize.import("./game"),
  Invite: sequelize.import("./invite"),
  InviteStatuses: sequelize.import("./inviteStatuses"),
  Likes: sequelize.import("./likes"),
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
