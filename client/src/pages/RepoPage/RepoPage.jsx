import { useParams } from "react-router-dom";

import "./RepoPage.css";
import BackButton from "../../components/common/BackButton";

import LineChart from "../../components/Widgets/Charts/LineChart";
import BarChart from "../../components/Widgets/Charts/BarChart";
import NumberChart from "../../components/Widgets/Charts/NumberChart";
import CommitList from "../../components/Widgets/CommitList";

import { RepoClient } from "../../api";
import { useQueries } from "react-query";

const RepoPage = () => {
  let { username, repo } = useParams();

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
      queryKey: ["repoDetails", repo.name],
      queryFn: () => repoClient.getDetails(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["commits", repo.name],
      queryFn: () => repoClient.getCommits(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["repoLanguages", repo.name],
      queryFn: () => repoClient.getRepoLanguages(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["repoEvents", repo.name],
      queryFn: () => repoClient.getEvents(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["codeFrequency", repo.name],
      queryFn: () => repoClient.getCodeFrequency(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["commitActivity", repo.name],
      queryFn: () => repoClient.getCommitActivity(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["contributors", repo.name],
      queryFn: () => repoClient.getContributors(),
      initialData: [],
      retry: false,
    },
  ]);

  if (commitActivity.data.status === 202) {
    commitActivity.refetch();
  }

  if (codeFrequency.data.status === 202) {
    codeFrequency.refetch();
  }

  if (contributors.data.status === 202) {
    contributors.refetch();
  }

  return (
    <>
      <BackButton to={`/users/${username}`} />
      <div id="repo-page" style={{ marginTop: "40px" }}>
        <h1 style={{margin: "0px 10px"}}>
          <a href={repoDetails?.data?.results?.html_url}>
            {repoDetails?.data?.results?.full_name}
          </a>
        </h1>
        <div className="repo-dashboard">
          <div className="row row1">
            <div>
              <NumberChart
                title="Stars"
                data={repoDetails?.data?.results?.stargazers_count}
                isLoading={repoDetails.isLoading}
                error={repoDetails.error}
              />
            </div>
            <div>
              <NumberChart
                title="Followers"
                data={repoDetails?.data.results?.subscribers_count}
                isLoading={repoDetails.isLoading}
                error={repoDetails.error}
              />
            </div>
            <div>
              <NumberChart
                title="Forks"
                data={repoDetails?.data.results?.forks_count}
                isLoading={repoDetails.isLoading}
                error={repoDetails.error}
              />
            </div>
            <div>
              <NumberChart
                title="Open Issues"
                data={repoDetails?.data.results?.open_issues_count}
                isLoading={repoDetails.isLoading}
                error={repoDetails.error}
              />
            </div>
          </div>
          <div className="row row2">
            <div>
              <LineChart
                status={commitActivity.data.status}
                title="Commits"
                type="commit"
                data={commitActivity?.data?.results}
                isLoading={commitActivity.isLoading}
                error={commitActivity.error}
              />
            </div>
            <div style={{ position: "relative" }}>
              <CommitList
                commits={commits?.data?.results?.slice(-5, -1) || []}
                isLoading={commits.isLoading}
                error={commits.error}
              />
            </div>
          </div>
          <div className="row row3">
            <div>
              <BarChart
                title="Languages Used"
                data={repoLanguages?.data?.results}
                isLoading={repoLanguages.isLoading}
                error={repoLanguages.error}
              />
            </div>
            <div>
              <LineChart
                title="Events"
                data={events.data?.results}
                isLoading={events.isLoading}
                error={events.error}
                type="event"
              />
            </div>
          </div>
          <div className="row row4">
            <div>
              <LineChart
                status={codeFrequency.data.status}
                title="Code Frequency"
                data={codeFrequency.data?.results}
                isLoading={codeFrequency.isLoading}
                error={codeFrequency.error}
                type="frequency"
              />
            </div>
            <div>
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
    </>
  );
};
export default RepoPage;
