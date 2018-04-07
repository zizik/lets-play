import Sequelize from "sequelize";

const sequelize = new Sequelize("letsPlay", "Zizik", "555", {
  dialect: "postgres",
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import("./user"),
  Game: sequelize.import("./game"),
  Invite: sequelize.import("./invite"),
  InviteStatuses: sequelize.import("./inviteStatus"),
  LikesStatuses: sequelize.import("./likeStatus"),
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
