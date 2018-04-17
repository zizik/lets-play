import jwt from "jsonwebtoken";

export function createTokens({ id }, secrets) {
  console.log("creating");
  const accessToken = jwt.sign(
    {
      user: id,
    },
    secrets.accessToken,
    {
      expiresIn: "1h",
    },
  );

  const refreshToken = jwt.sign(
    {
      user: id,
    },
    secrets.refreshToken,
    {
      expiresIn: "7d",
    },
  );

  return { accessToken, refreshToken };
}

export async function refreshTokens(token, refreshToken, models, secrets) {
  console.log("refreshing");
  let userId = 0;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, secrets.refreshSecret);
  } catch (err) {
    return {};
  }

  const tokens = await createTokens(user, secrets);
  return {
    ...tokens,
    user,
  };
}
