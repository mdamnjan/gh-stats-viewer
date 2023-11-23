import { Octokit } from "@octokit/rest";

export const port = process.env.PORT || 4000;

export const CLIENT_URL =
  process.env.NODE_ENV == "production"
    ? process.env.CLIENT_URL
    : "http://localhost:3000";

export const SERVER_URL =
  process.env.NODE_ENV == "production"
    ? process.env.SERVER_URL
    : `http://localhost:4000`;

export function getOctokit(req) {
  let octokit;
  if (req.isAuthenticated()) {
    octokit = new Octokit({ auth: req.user.token });
  } else if (process.env.GH_TOKEN) {
    octokit = new Octokit({ auth: process.env.GH_TOKEN });
  } else {
    octokit = new Octokit({});
  }
  return octokit;
}

export async function getResource({ req, res, next, url }) {
  let octokit = getOctokit(req);
  let results;
  try {
    results = await octokit.request(url);
  } catch (error) {
    return next(error, req, res, next);
  }
  if (results) {
    res.status(results.status);
    return results.data;
  }
}
