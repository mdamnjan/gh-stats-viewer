import "./RepoCard.css";

const RepoCard = ({ repo }) => {
  return (
    <div key={`repo-${repo.id}`} className="repo-card">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a href={repo.homepage}>{repo.homepage}</a>
    </div>
  );
};
export default RepoCard