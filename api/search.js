import { GhApiClient } from "./utils.js";

export async function searchUsers(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /search/users?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
  });
}

export async function searchRepos(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  // stupid workaround to deal with the ':'s not being handled properly
  let q = req.query.q.replaceAll(":", "%3A");
  return GhApi.rest({
    url: `GET /search/repositories?q=${q}&page=${req.query.page}&per_page=${req.query.per_page}&sort=updated`,
  });
}

export async function searchCommits(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /search/commits?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
  });
}
