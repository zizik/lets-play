import jwt from "jsonwebtoken";

export function createTokens(user, secrets) {
  const newRefreshSecret = user.password + secrets.refreshToken;
  const accessToken = jwt.sign(
    {
      user,
    },
    secrets.accessToken,
    {
      expiresIn: "1h",
    },
  );

  const refreshToken = jwt.sign(
    {
      user,
    },
    newRefreshSecret,
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
    const newRefreshSecret = user.password + secrets.refreshToken;
    jwt.verify(refreshToken, newRefreshSecret);
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
