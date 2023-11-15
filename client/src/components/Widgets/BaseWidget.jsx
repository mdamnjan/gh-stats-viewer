import { ExclamationTriangle } from "react-bootstrap-icons";

const EmptyState = ({ children }) => {
  return (
    <div
      className="card chart-container"
      style={{
        padding: "30px",
        minHeight: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ExclamationTriangle style={{ marginRight: "5px" }} />
      {children}
    </div>
  );
};

const BaseWidget = ({ children, error, isLoading, status, style }) => {
  if (status === 202) {
    return (
      <EmptyState>
        <span>{"Loading..."}</span>
        <span>{"This query is quite large and may take some time."}</span>
      </EmptyState>
    );
  }
  if (isLoading) {
    return (
      <EmptyState>
        <span>{"No results found."}</span>
      </EmptyState>
    );
  }
  if (error) {
    return (
      <EmptyState>
        <span >{error.response.data}</span>
      </EmptyState>
    );
  }
  return (
    <div
      className="card chart-container"
      style={{ padding: "10px", minWidth: 0, minHeight: "150px", ...style}}
    >
      {children}
    </div>
  );
};
export default BaseWidget;
