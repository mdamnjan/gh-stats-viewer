export function errorHandler(err, req, res, next) {
  console.log("error", err);
  if (err.status) {
    res.status(err.status);
    if (err.status == 401) {
      res.send("Unauthorized, you do not have access to this resource.")
    }
    if (err.status == 403) {
      res.send(
        "Rate limit exceeded, please sign in with GitHub to continue using the GitHub REST API."
      );
      return;
    }
  }
  if (err.message) {
    res.send(err.message);
  }
  return;
}
