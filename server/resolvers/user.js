import bcrypt from "bcrypt";

import formatErrors from "../formatErrors";
import { createTokens } from "../jwt";

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findById(id),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },

  Mutation: {
    createUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          data: user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    login: async (parent, { email, password }, { models, SECRETS }) => {
      try {
        const user = await models.User.findOne({ where: { email }, raw: true });
        if (!user) {
          throw new Error("Cannot find user with this email");
        }
        const isPasswordsEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordsEqual) {
          throw new Error("Passwords not equal");
        }
        const tokens = await createTokens(user, SECRETS);
        return {
          ok: true,
          data: tokens,
        };
      } catch (err) {
        return {
          ok: false,
          errors: [
            {
              reason: "login",
              message: err.message,
            },
          ],
        };
      }
    },
  },
};
