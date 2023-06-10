const BaseTab = ({ repo, children }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">{repo?.name}</h5>
      {children}
    </div>
  );
};
export default BaseTab;
