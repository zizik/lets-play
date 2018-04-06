import Sequelize from "sequelize";

const sequelize = new Sequelize("letsplay", "zizik", "555", {
  dialect: "postgres",
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import("./user"),
  // UserStatuses: sequelize.import("./userStatuses"),
  // Game: sequelize.import("./game"),
  // Invite: sequelize.import("./invite"),
  // InviteStatuses: sequelize.import("./inviteStatuses"),
  // Likes: sequelize.import("./likes"),
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

console.log(models);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
