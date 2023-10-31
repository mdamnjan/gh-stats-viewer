import axios from "axios";

export const getRateLimit = async () => {
  return axios.get(`https://api.github.com/rate_limit`);
};

export const search = async ({ resource, searchTerm, page, perPage }) => {
  return axios.get(
    `https://api.github.com/search/${resource}?q=${searchTerm}&page=${page}&per_page=${perPage}`
  );
};