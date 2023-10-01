import { getOctokit, getResource } from "./utils.js";

export async function getRepoLanguages(req, res, next) {
  let octokit = getOctokit(req);

  let languages;
  try {
    languages = await octokit.request(
      `GET /repos/${req.query.user}/${req.query.repo}/languages`
    );
  } catch (error) {
    return next(error, req, res, next);
  }

  return res.json(languages.data);
}

export async function getEvents(req, res, next) {
  let octokit = getOctokit(req);
  let events;
  try {
    events = await octokit.rest.activity.listRepoEvents({
      owner: req.query.user,
      repo: req.query.repo,
      per_page: req.query.num_events,
    });
  } catch (error) {
    return next(error, req, res, next);
  }
  return res.json(events.data);
}

export async function getRepoIssues(req, res, next) {
  let octokit = getOctokit(req);
  let issues;
  try {
    issues = await octokit.rest.issues.listForRepo({
      owner: req.query.user,
      repo: req.query.repo,
    });
  } catch (error) {
    return next(error, req, res, next);
  }

  return res.json(issues.data);
}

export async function getRepo(req, res, next) {
  let octokit = getOctokit(req);
  let repoDetails;
  try {
    repoDetails = await octokit.request(
      `GET /repos/${req.query.user}/${req.query.repo}`
    );
  } catch (error) {
    return next(error, req, res, next);
  }
  return res.json(repoDetails.data);
}

export async function getCommits(req, res, next) {
  let octokit = getOctokit(req);

  let commits;
  try {
    commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: req.query.user,
      repo: req.query.repo,
      per_page: req.query.num_commits,
    });
  } catch (error) {
    return next(error, req, res, next);
  }

  // console.log(commits.headers['link'])

  let commitCount = 0;

  // await octokit
  // .request("GET /repos/{owner}/{repo}/commits", {owner: req.query.user, repo: req.query.repo})
  // .then((commits) => {
  //   // issues is an array of all issue objects. It is not wrapped in a { data, headers, status, url } object
  //   // like results from `octokit.request()` or any of the endpoint methods such as `octokit.rest.issues.listForRepo()`
  //   commitCount = commits.length
  // });

  return res.json({ commits: commits.data, commitCount: commitCount });
}

export async function getContributors(req, res, next) {
  const contributors = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/contributors`,
    next
  );
  return res.json(contributors);
}

export async function getCodeFrequency(req, res, next) {
  const codeFrequency = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/code_frequency`,
    next
  );
  return res.json(codeFrequency);
}

export async function getCommitActivity(req, res, next) {
  const lastYearOfCommits = await getResource(
    req,
    res,
    `GET /repos/${req.query.user}/${req.query.repo}/stats/commit_activity`,
    next
  );
  return res.json(lastYearOfCommits);
}

export async function getParticipation(req, res, next) {
    const participation = await getResource(
      req,
      res,
      `GET /repos/${req.query.user}/${req.query.repo}/stats/participation`,
      next
    );
    return res.json(participation);
  }

