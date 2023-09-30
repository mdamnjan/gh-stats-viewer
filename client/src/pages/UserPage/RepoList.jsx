import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";

const RepoList = ({ repos, error, isLoading }) => {
  const navigate = useNavigate();

  let { username } = useParams();
  return (
    <div className="repo-list">
      {error && (
        <div>
          {error.response?.status}
          {error.response?.statusText}
        </div>
      )}
      {isLoading && (
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
          onClick={() => navigate(`/${username}/${repo.name}`)}
          repo={repo}
        ></Card>
      ))}
    </div>
  );
};
export default RepoList;
