import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./RepoPage.css";
import { fetchData } from "../../utils";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import NumberChart from "../../components/NumberChart";
import CommitList from "../../components/CommitList";

const RepoPage = () => {
  let { username, repo } = useParams();

  const [repoStats, setRepoStats] = useState([]);
  const [commits, setCommits] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(undefined);
  const [rateLimit, setRateLimit] = useState({});

  const getRepoData = async () => {
    fetchData({
      url: `repo-stats?user=${username}&repo=${repo}`,
      setData: setRepoStats,
      setError,
    });
    fetchData({
      url: `commits?user=${username}&repo=${repo}&num_commits=4`,
      setData: setCommits,
      setError,
    });
    fetchData({
      url: `events?user=${username}&repo=${repo}`,
      setData: setEvents,
      setError,
    });
    fetchData({ url: `rate_limit`, setData: setRateLimit, setError });
  };

  useEffect(() => {
    getRepoData();
  }, []);

  console.log(commits, repoStats, events);
  console.log("commits", commits);
  console.log("rate limit", rateLimit);

  return (
    <div id="repo-page">
      <h1>{repoStats.full_name}</h1>
      <div className="repo-dashboard container">
        <div id="row1" className="dashboard-row row">
          <div style={{ height: "100%" }} className="col-lg-8 col-sm-12">
            <LineChart title="Commits" inputData={commits} />
          </div>
          <div className="col-lg-4 col-sm-12">
            <CommitList commits={commits} />
          </div>
        </div>
        <div id="row2" className="dashboard-row row">
          <div className="col-lg-6 col-sm-12">
            <BarChart title="Languages Used" inputData={repoStats.languages} />
          </div>
          <div className="col-lg-6 col-sm-12">
            <LineChart title="Events" inputData={events} />
          </div>
        </div>
        <div id="row3" className="dashboard-row row">
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Num Commits" data={commits.length} />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Followers" data={repoStats.subscribers_count} />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Num Forks" data={repoStats.forks_count} />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart title="Watchers" data={repoStats.watchers_count} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepoPage;
