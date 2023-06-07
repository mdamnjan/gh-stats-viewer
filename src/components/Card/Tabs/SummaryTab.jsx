import BaseTab from "./BaseTab";

import { Star, Eye, Bezier2, ArrowUpRightSquare } from "react-bootstrap-icons";

const SummaryTab = ({ repo }) => {
  return (
    <BaseTab repo={repo}>
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
      {/* {repo.homepage && (
        <a href={repo.homepage} className="btn btn-primary">
          {repo.homepage} <ArrowUpRightSquare />
        </a>
      )} */}
    </BaseTab>
  );
};
export default SummaryTab;
