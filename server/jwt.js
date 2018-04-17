import jwt from "jsonwebtoken";

export function createTokens({ id }, secrets) {
  const user = { id };
  const accessToken = jwt.sign(
    {
      user,
    },
    secrets.accessToken,
    {
      expiresIn: "1s",
    },
  );

  const refreshToken = jwt.sign(
    {
      user,
    },
    secrets.refreshToken,
    {
      expiresIn: "7d",
    },
  );

  return { accessToken, refreshToken };
}

export async function refreshTokens(token, refreshToken, models, secrets) {
  try {
    const { user: { id } } = jwt.decode(token);
    const user = await models.User.findOne({ where: { id }, raw: true });
    if (!user) {
      throw new Error();
    }
    const tokens = await createTokens(user, secrets);
    return {
      ...tokens,
      user: {
        id: user.id,
      },
    };
  } catch (err) {
    return {};
  }
}
