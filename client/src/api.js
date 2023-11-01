import axios from "axios";
import { SERVER_URL } from "./utils";

export const getRateLimit = async () => {
  return axios.get(`https://api.github.com/rate_limit`);
};

export const search = async ({ resource, searchTerm, page, perPage }) => {
  return axios.get(
    `https://api.github.com/search/${resource}?q=${searchTerm}&page=${page}&per_page=${perPage}`
  );
};

export class RepoClient {
  constructor(username, repo) {
    this.username = username;
    this.repo = repo;
  }

  async getDetails() {
    return fetchData(`repo-details?user=${this.username}&repo=${this.repo}`);
  }

  async getCommits() {
    return fetchData(
      `commits?user=${this.username}&repo=${this.repo}&num_commits=100`
    );
  }

  async getRepoLanguages() {
    return fetchData(`repo-languages?user=${this.username}&repo=${this.repo}`);
  }

  async getEvents() {
    return fetchData(
      `repo-events?user=${this.username}&repo=${this.repo}&num_events=100`
    );
  }

  async getCodeFrequency() {
    return fetchData(`code-frequency?user=${this.username}&repo=${this.repo}`);
  }

  async getCommitActivity() {
    return fetchData(`commit-activity?user=${this.username}&repo=${this.repo}`);
  }

  async getRepoIssues() {
    return fetchData(`repo-issues?user=${this.username}&repo=${this.repo}`);
  }

  async getContributors() {
    return fetchData(`contributors?user=${this.username}&repo=${this.repo}`);
  }
}

export const fetchData = async (url) => {
  return axios
    .get(`${SERVER_URL}/${url}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
};
