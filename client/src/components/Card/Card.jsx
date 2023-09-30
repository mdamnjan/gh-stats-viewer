import "./Card.css";

import { getLastUpdatedString } from "../../utils";

import CardNavBar from "./CardNavBar";
import SummaryTab from "./Tabs/SummaryTab";
import ActivityTab from "./Tabs/ActivityTab";
import MetricsTab from "./Tabs/MetricsTab";

import { useState } from "react";

const Card = ({ key, repo, onClick, isLoading }) => {
  if (isLoading) {
    return (
      <div
        data-bs-theme="dark"
        key={`repo-${key}`}
        className="card placeholder-glow"
      >
        <SummaryTab repo={repo} isLoading={isLoading} />
        <div className="card-footer text-body-secondary">
          <h6 className="placeholder col-2"><span></span></h6>
        </div>
      </div>
    );
  }

  return (
    <div data-bs-theme="dark" key={`repo-${repo.id}`} className="card">
      <SummaryTab repo={repo} />
      <div className="card-footer text-body-secondary">
        <h6>{getLastUpdatedString(repo.pushed_at)}</h6>
        <button onClick={onClick} className="btn btn-primary">
          details
        </button>
      </div>
    </div>
  );
};
export default Card;
