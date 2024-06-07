import { ExclamationTriangle } from "react-bootstrap-icons";

const EmptyState = ({ style, children }) => {
  return (
    <div
      className="card chart-container"
      style={{
        padding: "30px",
        minHeight: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        ...style,
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
      <EmptyState style={style}>
        <span>{"Loading..."}</span>
        <span>{"This query is quite large and may take some time."}</span>
      </EmptyState>
    );
  }
  if (isLoading) {
    return (
      <EmptyState style={style}>
        <span>{"No results found."}</span>
      </EmptyState>
    );
  }
  if (error) {
    return (
      <EmptyState style={style}>
        <span>{error.response.data.message}</span>
      </EmptyState>
    );
  }
  return (
    <div
      className="card chart-container"
      style={{ padding: "10px", minWidth: 0, minHeight: "150px", ...style }}
    >
      {children}
    </div>
  );
};
export default BaseWidget;
