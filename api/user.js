import { GhApiClient } from "./utils.js";

export async function getUser(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /users/${req.query.user}`,
  });
}

export async function getUserEvents(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  let url;
  if (req.isAuthenticated()) {
    url = `GET /users/${req.query.user}/events?per_page=${req.query.num_events}`;
  } else {
    url = `GET /users/${req.query.user}/events/public?per_page=${req.query.num_events}`;
  }

  return GhApi.rest({ url });
}

export async function getRepos(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  let url;
  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    url = `GET /user/repos?sort=pushed`;
  } else {
    url = `GET /users/${req.query.user}/repos?sort=pushed`;
  }

  return GhApi.rest({ url });
}

export async function getRateLimit(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: "GET /rate_limit",
  });
}
