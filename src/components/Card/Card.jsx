import "./Card.css";
import { getLastUpdatedString } from "../../utils";

import { Star, Eye, Bezier2, ArrowUpRightSquare } from "react-bootstrap-icons";
import { act } from "react-dom/test-utils";
import CardNavBar from "./CardNavBar";
import SummaryTab from "./Tabs/SummaryTab";

const Card = ({ repo }) => {
  console.log("Last updated", getLastUpdatedString(repo.updated_at));
  return (
    <div data-bs-theme="dark" key={`repo-${repo.id}`} className="card">
      <div class="card-header">
        <CardNavBar/>
      </div>
      <SummaryTab repo={repo}/>
      <div className="card-footer text-body-secondary">
        <h6>{getLastUpdatedString(repo.updated_at)}</h6>
      </div>
    </div>
  );
};
export default Card;
