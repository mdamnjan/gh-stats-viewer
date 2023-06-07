import BaseTab from "./BaseTab";
import BarChart from "../../Charts/BarChart";
import "./Tabs.css";

import { Octokit } from "octokit";
import { useState, useEffect } from "react";
import NumberWidget from "../../Charts/NumberWidget";

const MetricsTab = ({ repo }) => {
  const octokit = new Octokit({
    // use access token from env for now
    auth: process.env.REACT_APP_GH_ACCESS_TOKEN,
  });

  const [languages, setLanguages] = useState([]);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      const commits = await octokit.request(
        `GET /repos/${process.env.REACT_APP_GH_USER}/${repo.name}/commits`
      );
      setCommits(commits.data);
    };

    fetchCommits();

    const fetchLanguageData = async () => {
      const languages = await octokit.request(
        `GET /repos/${process.env.REACT_APP_GH_USER}/${repo.name}/languages`
      );
      setLanguages(languages.data);
    };

    fetchLanguageData();
  }, []);

  return (
    <BaseTab repo={repo}>
      <div className="metrics-tab-container">
        <BarChart inputData={languages} />
        <NumberWidget title="Number of Commits" number={commits.length} />
      </div>
    </BaseTab>
  );
};
export default MetricsTab;
