import NumberChart from "./Charts/NumberChart";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import { ExclamationTriangle } from "react-bootstrap-icons";

const BaseWidget = ({ children, error }) => {
  if (error) {
    return (
      <div className="card chart-container" style={{ padding: "10px" }}>
        <span style={{ verticalAlign: "middle" }}>
          <ExclamationTriangle style={{ marginRight: "5px" }} />
          {"No results found."}
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="card chart-container" style={{ padding: "10px" }}>
        <span style={{ verticalAlign: "middle" }}>
          <ExclamationTriangle style={{ marginRight: "5px" }} />
          {error.status}
          {error.message}
        </span>
      </div>
    );
  }
  return (
    <div className="card chart-container" style={{ padding: "10px" }}>
      {children}
    </div>
  );
};
export default BaseWidget;
