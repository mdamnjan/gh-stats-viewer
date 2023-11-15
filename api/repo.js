import { GhApiClient } from "./utils.js";

export async function getRepoLanguages(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/languages`,
  });
}

export async function getEvents(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/events?per_page=${req.query.num_events}`,
  });
}

export async function getRepoIssues(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/issues`,
  });
}

export async function getRepo(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}`,
  });
}

export async function getCommits(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/commits?per_page=${req.query.num_commits}`,
  });
}

export async function getContributors(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/contributors`,
  });
}

export async function getCodeFrequency(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/code_frequency`,
  });
}

export async function getCommitActivity(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/commit_activity`,
  });
}

export async function getParticipation(req, res, next) {
  const GhApi = new GhApiClient({ req, res, next });

  return GhApi.rest({
    url: `GET /repos/${req.query.user}/${req.query.repo}/stats/participation`,
  });
}
