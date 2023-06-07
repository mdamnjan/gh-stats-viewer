import "./Card.css";
import { getLastUpdatedString } from "../../utils";

import { Star, Eye, Bezier2, ArrowUpRightSquare } from "react-bootstrap-icons";
import { act } from "react-dom/test-utils";
import CardNavBar from "./CardNavBar";

const Card = ({ repo, activityTab }) => {
  console.log("Last updated", getLastUpdatedString(repo.updated_at));
  return (
    <div data-bs-theme="dark" key={`repo-${repo.id}`} className="card">
      <div class="card-header">
        <CardNavBar/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{repo.name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          <span className="badge rounded-pill text-bg-secondary">
            <Star />
            {repo.stargazers_count}
          </span>
          <span className="badge rounded-pill text-bg-secondary">
            <Eye />
            {repo.watchers_count}
          </span>
          <span className="badge rounded-pill text-bg-secondary">
            <Bezier2 />
            {repo.forks_count}
          </span>
        </h6>
        <div className="chart">
        {activityTab}
        </div>
        {/* <p className="card-text">{repo.description}</p>
        {repo.homepage && (
          <a href={repo.homepage} className="btn btn-primary">
            {repo.homepage} <ArrowUpRightSquare />
          </a>
        )} */}
      </div>
      <div className="card-footer text-body-secondary">
        <h6>{getLastUpdatedString(repo.updated_at)}</h6>
      </div>
    </div>
  );
};
export default Card;
