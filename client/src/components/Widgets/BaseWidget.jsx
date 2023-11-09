import { ExclamationTriangle } from "react-bootstrap-icons";

const BaseWidget = ({ children, error, isLoading, status }) => {
  console.log("base widget status", status);
  if (status === 202) {
    return (
      <div
        className="card chart-container"
        style={{ padding: "10px", minHeight: "200px" }}
      >
        <span style={{ verticalAlign: "middle" }}>
          <ExclamationTriangle style={{ marginRight: "5px" }} />
          {"Loading..."}
          <span>{"This query is quite large and may take some time."}</span>
        </span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        className="card chart-container"
        style={{ padding: "10px", minHeight: "200px" }}
      >
        <span style={{ verticalAlign: "middle" }}>
          <ExclamationTriangle style={{ marginRight: "5px" }} />
          {"No results found."}
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="card chart-container"
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
    );
  }
  return (
    <div
      className="card chart-container"
      style={{ padding: "10px", minHeight: "200px" }}
    >
      {children}
    </div>
  );
};
export default BaseWidget;
