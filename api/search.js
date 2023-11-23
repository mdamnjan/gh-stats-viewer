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
  // stupid workaround to deal with the ':'s not being handled properly
  let q = req.query.q.replaceAll(':', '%3A')
  return getResource({
    req,
    res,
    next,
    url: `GET /search/repositories?q=${q}&page=${req.query.page}&per_page=${req.query.per_page}&sort=updated`,
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