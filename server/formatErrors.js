export default (err, models) => {
  if (err instanceof models.sequelize.ValidationError) {
    return err.errors.map(e => ({ reason: e.path, message: e.message }));
  }
  console.log(err);
  return [{ reason: "server", message: "something whent wrong" }];
};
