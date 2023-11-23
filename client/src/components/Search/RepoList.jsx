import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

import { ExclamationTriangle } from "react-bootstrap-icons";

const RepoList = ({ repos, error, isLoading }) => {
  const navigate = useNavigate();

  let { username } = useParams();
  return (
    <div className="repo-list">
      {error && (
        <div
          style={{
            padding: "10px",
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ExclamationTriangle style={{ marginRight: "5px" }} />
          <span style={{ width: "80%" }}>{error.response.data}</span>
        </div>
      )}
      {(isLoading) && (
        <>
          <Card key={1} isLoading={isLoading} />
          <Card key={2} isLoading={isLoading} />
          <Card key={3} isLoading={isLoading} />
          <Card key={4} isLoading={isLoading} />
          <Card key={5} isLoading={isLoading} />
        </>
      )}
      {repos.map((repo) => (
        <Card
          key={repo.id}
          isLoading={isLoading}
          onClick={() => navigate(`/repos/${username}/${repo.name}`)}
          repo={repo}
        ></Card>
      ))}
    </div>
  );
};
export default RepoList;
