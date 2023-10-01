import { getOctokit } from "./utils.js";

export async function getUser(req, res, next) {
  let octokit = getOctokit(req);
  let user;
  try {
    user = await octokit.rest.users.getByUsername({
      username: req.query.user,
    });
  } catch (error) {
    return next(error, req, res, next);
  }
  return res.json(user.data);
}

export async function getUserEvents(req, res, next) {
  let octokit = getOctokit(req);
  let events;
  try {
    if (req.isAuthenticated()) {
      events = await octokit.rest.activity.listEventsForAuthenticatedUser({
        username: req.query.user,
        per_page: req.query.num_events,
      });
    } else {
      events = await octokit.rest.activity.listPublicEventsForUser({
        username: req.query.user,
        per_page: req.query.num_events,
      });
    }
  } catch (error) {
    return next(error, req, res, next);
  }
  return res.json(events.data);
}

export async function getRepos(req, res, next) {
  let repos;
  let octokit = getOctokit(req);

  if (req.isAuthenticated() && req.user.username == req.query.user) {
    // endpoint returns private repos as well if the Github App is authorized AND installed
    // see https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#difference-between-authorization-and-installation
    try {
      repos = await octokit.rest.repos.listForAuthenticatedUser({
        sort: "pushed",
      });
    } catch (error) {
      return next(error, req, res, next);
    }
  } else {
    try {
      repos = await octokit.rest.repos.listForUser({
        username: req.query.user,
        sort: "pushed",
      });
    } catch (error) {
      return next(error, req, res, next);
    }
  }
  return res.json(repos.data);
}

export async function getRateLimit(req, res, next) {
  let octokit = getOctokit(req);
  let rateLimit;
  try {
    rateLimit = await octokit.request("GET /rate_limit");
  } catch (error) {
    return next(error, req, res, next);
  }

  return res.json(rateLimit.data);
}
