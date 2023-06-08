import BaseTab from "./BaseTab";
import "./Tabs.css";

import { Octokit } from "octokit";
import { useState, useEffect } from "react";
import LineChart from "../../Charts/LineBar";

const ActivityTab = ({ repo }) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      const commits = await octokit.request(
        `GET /repos/${process.env.REACT_APP_GH_USER}/${repo.name}/commits`
      );
      setCommits(commits.data);
    };

    fetchCommits();
  }, []);

  const octokit = new Octokit({
    // use access token from env for now
    auth: process.env.REACT_APP_GH_ACCESS_TOKEN,
  });
  return (
    <BaseTab repo={repo}>
      <div className="activity-tab-container">
        <div className="chart-container">
          <LineChart inputData={commits} />
        </div>
      </div>
    </BaseTab>
  );
};
export default ActivityTab;
