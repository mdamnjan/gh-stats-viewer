import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useNavigate, useParams } from "react-router-dom";

import "../App.css";
import Tabs from "../components/Tabs/Tabs";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import Card from "../components/Card/Card";
import { fetchData } from "../utils";

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let { username } = useParams();

  const getUserData = async () => {
    fetchData({
      url: `repos?user=${username}`,
      setData: setRepos,
      setError: setError,
      setIsLoading: setIsLoading,
    });
    fetchData({
      url: `profile-stats?user=${username}`,
      setData: setUserData,
      setError: setError,
      setIsLoading: setIsLoading,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

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
          {error && (
            <div>
              {error.response?.status}
              {error.response?.statusText}
            </div>
          )}
          {isLoading && (
            <>
              <Card key={1} isLoading={isLoading} />
              <Card key={2} isLoading={isLoading} />
              <Card key={3} isLoading={isLoading} />
              <Card key={4} isLoading={isLoading} />
              <Card key={5} isLoading={isLoading} />
            </>
          )}
          {repos.map((repo) => (
            <Card
              key={repo.id}
              isLoading={isLoading}
              onClick={() => navigate(`/${username}/${repo.name}`)}
              repo={repo}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserPage;
