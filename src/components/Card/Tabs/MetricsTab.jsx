import BaseTab from "./BaseTab";
import BarChart from "../../BarChart";
import "./Tabs.css"

import { Octokit } from "octokit";
import { useState, useEffect } from "react";

const MetricsTab = ({ repo }) => {
  const octokit = new Octokit({
    // use access token from env for now
    auth: process.env.REACT_APP_GH_ACCESS_TOKEN,
  });

  const [languages, setLanguages] = useState([]);


  useEffect(() => {
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
      </div>
    </BaseTab>
  );
};
export default MetricsTab;
