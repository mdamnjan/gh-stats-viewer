import BaseWidget from "./BaseWidget";

const CommitList = ({ commits, isLoading, error }) => {
  return (
    <BaseWidget
      isLoading={isLoading}
      error={error}
      style={{
        minWidth: "0px",
        minHeight: "150px",
        height: " calc(100% - 40px)",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">Recent Commits</h5>
        {commits.map(
          (commit) =>
            commit.committer && (
              <div
                style={{
                  display: "flex",
                  padding: "4px",
                  verticalAlign: "middle",
                }}
              >
                <img
                  style={{
                    marginRight: "10px",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                  alt="Github user's avatar"
                  src={commit?.committer?.avatar_url}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "55px",
                  }}
                >
                  <h5>{commit?.committer?.login}</h5>
                  <span
                    className="text-truncate"
                    style={{ position: "absolute", width: "100%" }}
                  >
                    {commit.commit.message}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </BaseWidget>
  );
};
export default CommitList;
