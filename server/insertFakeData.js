import moment from "moment";

const expiredDate = moment().add(3, "hours");

const users = [
  { name: "test1", email: "test1@test.ru", password: "test1@test.ru" },
  { name: "test2", email: "test2@test.ru", password: "test2@test.ru" },
  { name: "test3", email: "test3@test.ru", password: "test3@test.ru" },
  { name: "test4", email: "test4@test.ru", password: "test4@test.ru" },
  { name: "test5", email: "test5@test.ru", password: "test5@test.ru" },
];

const games = [
  { name: "Dota", icon: "No Icon" },
  { name: "Dota2", icon: "Cool Icon" },
  { name: "Dota3", icon: "No Icon" },
  { name: "Dota4", icon: "No Icon" },
  { name: "Dota5", icon: "Not so cool" },
];

const invites = [
  { userId: 1, gameId: 2, description: "No description", expiredAt: expiredDate },
  { userId: 2, gameId: 3, description: "No description", expiredAt: expiredDate },
  { userId: 2, gameId: 1, description: "No description", expiredAt: expiredDate },
  { userId: 1, gameId: 3, description: "No description", expiredAt: expiredDate },
  { userId: 4, gameId: 2, description: "No description", expiredAt: expiredDate },
  { userId: 4, gameId: 2, description: "No description", expiredAt: expiredDate }, // In future should be error
];

const inviteStatuses = [{ status: "No Likes" }, { status: "Has Likes" }];

export default async models => {
  for (const user of users) {
    await models.User.create(user);
  }
  for (const game of games) {
    await models.Game.create(game);
  }
  for (const invite of invites) {
    await models.Invite.create(invite);
  }
  for (const inviteStatus of inviteStatuses) {
    await models.InviteStatus.create(inviteStatus);
  }
};
