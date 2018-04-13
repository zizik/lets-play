export default (err, models) => {
  if (err.name === "SequelizeValidationError") {
    return err.errors.map(e => ({ reason: e.path, message: e.message }));
  }
  console.log(err);
  return [{ reason: "server", message: "something whent wrong" }];
};
