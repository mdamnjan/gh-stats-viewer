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

export const fetchData = async ({ url }) => {
  return axios.get(`${SERVER_URL}/${url}`, {
    withCredentials: true,
  });
};
