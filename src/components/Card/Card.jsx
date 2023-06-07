import "./Card.css";
import { getLastUpdatedString } from "../../utils";

import { Star, Eye, Bezier2, ArrowUpRightSquare } from "react-bootstrap-icons";

const Card = ({ repo }) => {
  console.log("Last updated", getLastUpdatedString(repo.updated_at));
  return (
    <div data-bs-theme="dark" key={`repo-${repo.id}`} className="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <button class="nav-link active" aria-current="true" href="#">
              <h6>Summary</h6>
            </button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <h6>Activity</h6>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              {" "}
              <h6>Metrics</h6>
            </a>
          </li>
        </ul>
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
        <p className="card-text">{repo.description}</p>
        {repo.homepage && (
          <a href={repo.homepage} className="btn btn-primary">
            {repo.homepage} <ArrowUpRightSquare />
          </a>
        )}
      </div>
      <div className="card-footer text-body-secondary">
        <h6>{getLastUpdatedString(repo.updated_at)}</h6>
      </div>
    </div>
  );
};
export default Card;
