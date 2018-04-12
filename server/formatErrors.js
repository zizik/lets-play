export default (err, models) => {
  console.log(err.name, err.original.detail);
  return [{ path: "server", message: "something whent wrong" }];
};
