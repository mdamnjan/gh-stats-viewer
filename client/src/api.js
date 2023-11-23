import axios from "axios";
import { SERVER_URL } from "./utils";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export const search = async ({ resource, searchTerm, page, perPage, user }) => {
  let url = `/search/${resource}?q=${searchTerm}&page=${page}&per_page=${perPage}`;
  if (user) {
    url = `/search/${resource}?q=${user}/${searchTerm}&page=${page}&per_page=${perPage}`
  }
  return axiosInstance.get(url);
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

export class UserClient {
  constructor(username) {
    this.username = username;
  }

  async getUserEvents() {
    return fetchData(`user-events?user=${this.username}&num_events=100`);
  }

  async getUserRepos() {
    return fetchData(`repos?user=${this.username}`);
  }

  async getUserDetails() {
    return fetchData(`user-details?user=${this.username}`);
  }
}

export const fetchData = async (url) => {
  return axiosInstance.get(url).then((res) => {
    let data = { status: res.status, results: res.data };
    return data;
  });
};
