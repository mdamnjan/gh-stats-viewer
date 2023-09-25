const BaseTab = ({ repo, children }) => {
  return (
    <div className="card-body">
      <h5 className="card-title"><a href={repo?.html_url} style={{textDecoration: "none"}}>{repo?.name}</a></h5>
      {children}
    </div>
  );
};
export default BaseTab;
