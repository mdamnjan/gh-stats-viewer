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

export class GhApiClient {
  constructor({ req, res, next }) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.octokit = getOctokit(req);
  }

  async rest({ url }) {
    let results;
    try {
      results = await this.octokit.request(url);
    } catch (error) {
      return this.next(error, this.req, this.res, this.next);
    }
    if (results) {
      this.res.status(results.status);
      return this.res.json(results.data);
    }
  }

  async graphql({ query, dataHandlerFn }) {
    let results;
    try {
      results = await this.octokit.graphql(query);
    } catch (error) {
      return this.next(error, this.req, this.res, this.next);
    }
    if (results) {
      if (dataHandlerFn) {
        results = dataHandlerFn(results)
      }
      return this.res.json(results);
    }
  }
}
