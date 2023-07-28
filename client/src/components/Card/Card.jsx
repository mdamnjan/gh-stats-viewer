import "./Card.css";

import { getLastUpdatedString } from "../../utils";

import CardNavBar from "./CardNavBar";
import SummaryTab from "./Tabs/SummaryTab";
import ActivityTab from "./Tabs/ActivityTab";
import MetricsTab from "./Tabs/MetricsTab";

import { useState } from "react";
import { ArrowUpRightSquare } from "react-bootstrap-icons";

const Card = ({ repo, onClick }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const tabs = [
    { id: 1, text: "Summary" },
    { id: 2, text: "Activity" },
    { id: 3, text: "Metrics" },
  ];

  return (
    <div onClick={onClick} data-bs-theme="dark" key={`repo-${repo.id}`} className="card">
      <div class="card-header">
        <CardNavBar
          tabs={tabs}
          handleTabSelect={setCurrentTab}
          currentTab={currentTab}
        />
      </div>
      {currentTab === 1 && <SummaryTab repo={repo} />}
      {currentTab === 2 && <ActivityTab repo={repo} />}
      {currentTab === 3 && <MetricsTab repo={repo} />}
      <div className="card-footer text-body-secondary">
        <h6>{getLastUpdatedString(repo.updated_at)}</h6>
        {repo.homepage && (
          <a href={repo.homepage} className="btn btn-primary">
            <ArrowUpRightSquare />
          </a>
        )}
      </div>
    </div>
  );
};
export default Card;
