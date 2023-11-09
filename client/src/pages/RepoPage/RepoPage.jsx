import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./RepoPage.css";
import LineChart from "../../components/Widgets/Charts/LineChart";
import BarChart from "../../components/Widgets/Charts/BarChart";
import NumberChart from "../../components/Widgets/Charts/NumberChart";
import CommitList from "../../components/Widgets/CommitList";
import { RepoClient } from "../../api";
import { useQueries, useQuery } from "react-query";

const RepoPage = () => {
  let { username, repo } = useParams();

  const [error, setError] = useState(undefined);

  const repoClient = new RepoClient(username, repo);

  const [
    repoDetails,
    commits,
    repoLanguages,
    events,
    codeFrequency,
    commitActivity,
    contributors,
  ] = useQueries([
    {
      queryKey: ["repoDetails"],
      queryFn: () => repoClient.getDetails(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["commits"],
      queryFn: () => repoClient.getCommits(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["repoLanguages"],
      queryFn: () => repoClient.getRepoLanguages(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["repoEvents"],
      queryFn: () => repoClient.getEvents(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["codeFrequency"],
      queryFn: () => repoClient.getCodeFrequency(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["commitActivity"],
      queryFn: () => repoClient.getCommitActivity(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["contributors"],
      queryFn: () => repoClient.getContributors(),
      initialData: [],
      retry: false,
    },
  ]);

  console.log(codeFrequency);

  return (
    <div id="repo-page">
      <h1>{repoDetails?.data?.results?.full_name}</h1>
      {error && (
        <span>
          {error.response
            ? `Error: ${error.response?.status} ${error.response?.data}`
            : `Error: ${error.message}`}{" "}
        </span>
      )}
      <div className="repo-dashboard container">
        <div id="row1" className="dashboard-row row">
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Num Open Issues"
              data={repoDetails?.data.results?.open_issues_count}
              isLoading={repoDetails.isLoading}
              error={repoDetails.error}
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Followers"
              data={repoDetails?.data.results?.subscribers_count}
              isLoading={repoDetails.isLoading}
              error={repoDetails.error}
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Num Forks"
              data={repoDetails?.data.results?.forks_count}
              isLoading={repoDetails.isLoading}
              error={repoDetails.error}
            />
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <NumberChart
              title="Stars"
              data={repoDetails?.data?.results?.stargazers_count}
              isLoading={repoDetails.isLoading}
              error={repoDetails.error}
            />
          </div>
        </div>
        <div
          id="row2"
          className="dashboard-row row"
          style={{ display: "flex !important" }}
        >
          <div
            style={{ height: "100% !important", flexGrow: 1 }}
            className="col-lg-8 col-sm-12"
          >
            <LineChart
              status={commitActivity.data.status}
              title="Commits"
              type="commit"
              data={commitActivity?.data?.results}
              isLoading={commitActivity.isLoading}
              error={commitActivity.error}
            />
          </div>
          <div className="col-lg-4 col-sm-12">
            <CommitList
              commits={commits?.data?.results?.commits?.slice(-5, -1) || []}
              isLoading={commits.isLoading}
              error={commits.error}
            />
          </div>
        </div>
        <div id="row2" className="dashboard-row row">
          <div className="col-lg-6 col-sm-12">
            <BarChart
              title="Languages Used"
              data={repoLanguages?.data?.results}
              isLoading={repoLanguages.isLoading}
              error={repoLanguages.error}
            />
          </div>
          <div className="col-lg-6 col-sm-12">
            <LineChart
              title="Events"
              data={events.data?.results}
              isLoading={events.isLoading}
              error={events.error}
              type="event"
            />
          </div>
        </div>
        <div id="row3" className="dashboard-row row">
          <div className="col-md-6 col-sm-12">
            <LineChart
              status={codeFrequency.data.status}
              title="Code Frequency"
              data={codeFrequency.data?.results}
              isLoading={codeFrequency.isLoading}
              error={codeFrequency.error}
              type="frequency"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <BarChart
              status={contributors.data.status}
              title="Contributors"
              data={contributors?.data?.results}
              isLoading={contributors.isLoading}
              error={contributors.error}
              type="contributors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepoPage;
