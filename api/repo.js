import { getResource } from "./utils.js";

export async function getRepoLanguages(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/languages`,
  }).then((results) => res.json(results));
}

export async function getEvents(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/events?per_page=${req.query.num_events}`,
  }).then((results) => res.json(results));
}

export async function getRepoIssues(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/issues`,
  }).then((results) => res.json(results));
}

export async function getRepo(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}`,
  }).then((results) => res.json(results));
}

export async function getCommits(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/commits?per_page=${req.query.num_commits}`,
  }).then((results) => res.json(results));
}

export async function getContributors(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/contributors`,
  }).then((results) => res.json(results));
}

export async function getCodeFrequency(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/code_frequency`,
  }).then((results) => res.json(results));
}

export async function getCommitActivity(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/commit_activity`,
  }).then((results) => res.json(results));
}

export async function getParticipation(req, res, next) {
  return getResource({
    req,
    res,
    next,
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/participation`,
  }).then((results) => res.json(results));
}
