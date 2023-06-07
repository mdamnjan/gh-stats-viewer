import "./Card.css";

import { Star, Eye, Bezier2, ArrowUpRightSquare, Github } from "react-bootstrap-icons";

const Card = ({ repo }) => {
  return (
    <div data-bs-theme="dark" key={`repo-${repo.id}`} class="card">
      <div class="card-body">
        <h5 class="card-title">{repo.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          <span class="badge rounded-pill text-bg-secondary">
            <Star />
            {repo.stargazers_count}
          </span>
          <span class="badge rounded-pill text-bg-secondary">
            <Eye />
            {repo.watchers_count}
          </span>
          <span class="badge rounded-pill text-bg-secondary">
            <Bezier2 />
            {repo.forks_count}
          </span>
        </h6>
        <p class="card-text">{repo.description}</p>
        {repo.homepage && <a href={repo.homepage} class="btn btn-primary">
          {repo.homepage} <ArrowUpRightSquare />
        </a>}
      </div>
      <div class="card-footer text-body-secondary">
        <h6>Updated {repo.updated_at}</h6>
      </div>
    </div>
  );
};
export default Card;
