import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import "../App.css";

const RepoPage = () => {
  let { username, repo } = useParams();

  const [repoStats, setRepoStats] = useState([]);
  const [commits, setCommits] = useState([]);

  const getRepoData = async () => {
    const repoData = await axios.get(
      `http://localhost:4000/repo-stats?user=${username}&repo=${repo}`,
      { withCredentials: true }
    );
    setRepoStats(repoData.data);
    const commits = await axios.get(
      `http://localhost:4000/commits?user=${username}&repo=${repo}`,
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
