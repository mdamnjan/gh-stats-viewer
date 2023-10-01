import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useParams } from "react-router-dom";

import "../../App.css";
import Tabs from "../../components/Tabs/Tabs";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import { fetchData } from "../../utils";
import RepoList from "./RepoList";
import UserOverview from "./UserOverview";


const UserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isRepoView, setIsRepoView] = useState(true);

  let { username } = useParams();

  const getUserData = async () => {
    fetchData({
      url: `repos?user=${username}`,
      setData: setRepos,
      setError: setError,
      setIsLoading: setIsLoading,
    });
    fetchData({
      url: `user-details?user=${username}`,
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
          onClick={(e) => setIsRepoView(!isRepoView)}
          tabs={[
            { text: "Overview", active: !isRepoView, icon: <BarChartLine /> },
            {
              text: "Repositories",
              active: isRepoView,
              icon: <JournalCode />,
            },
          ]}
        />
        {!isRepoView && <UserOverview username={username} userData={userData}/>}
        {isRepoView && <RepoList repos={repos} isLoading={isLoading} error={error} />}
      </div>
    </>
  );
};
export default UserPage;
