import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./RepoPage.css";
import { fetchData } from "../../utils";
import LineChart from "../../components/Widgets/Charts/LineChart";
import BarChart from "../../components/Widgets/Charts/BarChart";
import NumberChart from "../../components/Widgets/Charts/NumberChart";
import CommitList from "../../components/Widgets/CommitList";

const RepoPage = () => {
  let { username, repo } = useParams();

  const [repoDetails, setRepoDetails] = useState([]);
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [commits, setCommits] = useState([]);
  const [events, setEvents] = useState([]);
  const [codeFrequency, setCodeFrequency] = useState([]);
  const [commitActivity, setCommitActivity] = useState([]);
  const [repoIssues, setRepoIssues] = useState([]);
  const [error, setError] = useState(undefined);
  const [rateLimit, setRateLimit] = useState({});

  const getRepoData = async () => {
    fetchData({
      url: `repo-details?user=${username}&repo=${repo}`,
      setData: setRepoDetails,
      setError,
    });
    fetchData({
      url: `repo-languages?user=${username}&repo=${repo}`,
      setData: setRepoLanguages,
      setError,
    });
    fetchData({
      url: `commits?user=${username}&repo=${repo}&num_commits=100`,
      setData: setCommits,
      setError,
    });
    fetchData({
      url: `repo-events?user=${username}&repo=${repo}&num_events=100`,
      setData: setEvents,
      setError,
    });
    fetchData({
      url: `code-frequency?user=${username}&repo=${repo}`,
      setData: setCodeFrequency,
      setError,
    });
    fetchData({
      url: `commit-activity?user=${username}&repo=${repo}`,
      setData: setCommitActivity,
      setError,
    });
    fetchData({
      url: `repo-issues?user=${username}&repo=${repo}`,
      setData: setRepoIssues,
      setError,
    });
    fetchData({ url: `rate-limit`, setData: setRateLimit, setError });
  };

  useEffect(() => {
    getRepoData();
  }, []);

  return (
    <div id="repo-page">
      <h1>{repoDetails.full_name}</h1>
      {error && (
        <span>
          {error.response
            ? `Error: ${error.response?.status} ${error.response?.data}`
            : `Error: ${error.message}`}{" "}
        </span>
      )}
      <div className="repo-dashboard container">
        <div id="row1" className="dashboard-row row">
          <div style={{ height: "100%" }} className="col-lg-8 col-sm-12">
            <LineChart
              title="Commits"
              type="commit"
              data={commitActivity}
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <CommitList commits={commits?.commits?.slice(-5, -1) || []} />
          </div>
        </div>
        <div id="row2" className="dashboard-row row">
          <div className="col-lg-6 col-sm-12">
            <BarChart title="Languages Used" data={repoLanguages} />
          </div>
          <div className="col-lg-6 col-sm-12">
            <LineChart title="Events" data={events} type="event" />
          </div>
        </div>
        <div id="row3" className="dashboard-row row">
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Num Open Issues"
              data={repoDetails.open_issues_count}
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Followers"
              data={repoDetails.subscribers_count}
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Num Forks" data={repoDetails.forks_count} />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Stars" data={repoDetails.stargazers_count} />
          </div>
        </div>
        <div id="row3" className="dashboard-row row">
          <div className="col">
            <LineChart
              title="Code Frequency"
              data={codeFrequency}
              type="frequency"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepoPage;
