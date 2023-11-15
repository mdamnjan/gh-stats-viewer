import { getResource } from "./utils.js";

export async function searchUsers(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /search/users?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
  }).then((results) => res.json(results));
}

export async function searchRepos(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /search/repositories?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
  }).then((results) => res.json(results));
}

export async function searchCommits(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /search/commits?q=${req.query.q}&page=${req.query.page}&per_page=${req.query.per_page}`,
  }).then((results) => res.json(results));
}