export function errorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status);
    if (err.status == 401) {
      res.send({
        message: "Unauthorized, you do not have access to this resource.",
      });
      return;
    }
    if (err.status == 403) {
      if (
        !req.isAuthenticated() &&
        err.response.headers["x-ratelimit-resource"] == "graphql"
      ) {
        res.send({
          message: "Sorry, you must be signed in with GitHub to see this data.",
        });
      } else {
        res.send({
          message:
            "Rate limit exceeded, please sign in with GitHub to continue using the GitHub REST API.",
        });
      }

      return;
    }
  }
  if (err.message) {
    res.send(err.message);
  }
  return;
}
