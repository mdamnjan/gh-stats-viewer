import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import "../App.css";
import { BACKEND_URL } from "../utils";

const RepoPage = () => {
  let { username, repo } = useParams();

  const [repoStats, setRepoStats] = useState([]);
  const [commits, setCommits] = useState([]);

  const getRepoData = async () => {
    const repoData = await axios.get(
      `${BACKEND_URL}/repo-stats?user=${username}&repo=${repo}`,
      { withCredentials: true }
    );
    setRepoStats(repoData.data);
    const commits = await axios.get(
      `${BACKEND_URL}/commits?user=${username}&repo=${repo}`,
      { withCredentials: true }
    );
    setCommits(commits.data);
  };

  useEffect(() => {
    getRepoData();
  }, []);

  console.log(commits, repoStats);

  return <></>;
};
export default RepoPage;
