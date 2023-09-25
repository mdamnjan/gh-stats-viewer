import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useNavigate, useParams } from "react-router-dom";

import "../App.css";
import Tabs from "../components/Tabs/Tabs";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import Card from "../components/Card/Card";
import { fetchData } from "../utils";

const UserPage = () => {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  let { username } = useParams();

  const getUserData = async () => {
    fetchData({url: `repos?user=${username}`, setData: setRepos})
    fetchData({url: `profile-stats?user=${username}`, setData: setUserData})
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log(repos)

  return (
    <>
      <ProfileSideBar user={userData} />
      <div className="contents">
        <Tabs
          tabs={[
            { text: "Overview", active: false, icon: <BarChartLine /> },
            { text: "Repositories", active: true, icon: <JournalCode /> },
          ]}
        />
        <div className="repo-list">
          {repos.map((repo) => (
            <Card
              onClick={() => navigate(`/${username}/${repo.name}`)}
              repo={repo}
              // activityTab={<BarChart inputData={languages} />}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserPage;
