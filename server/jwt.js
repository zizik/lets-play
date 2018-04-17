import jwt from "jsonwebtoken";

export default ({ id }, secrets) => {
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
};
