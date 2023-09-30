const BaseTab = ({ repo, children, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card-body">
        <h5 className="card-title placeholder col-3"><a href={""} style={{textDecoration: "none"}}></a></h5>
        <br/>
        {children}
      </div>
    );
  }
  return (
    <div className="card-body">
      <h5 className="card-title"><a href={repo?.html_url} style={{textDecoration: "none"}}>{repo?.name}</a></h5>
      {children}
    </div>
  );
};
export default BaseTab;
