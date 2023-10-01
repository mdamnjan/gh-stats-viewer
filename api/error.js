export function errorHandler(err, req, res, next) {
  console.log("error", err);
  if (err.status) {
    res.status(err.status);
    if (err.status == 401) {
      console.log("hi this is a 401 error");
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
