import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useParams } from "react-router-dom";
import { useQueries } from "react-query";

import "../../App.css";
import Tabs from "../../components/Tabs/Tabs";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import { fetchData } from "../../utils";
import RepoList from "./RepoList";
import UserOverview from "./UserOverview";

import { UserClient } from "../../api";

const UserPage = () => {
  const [isRepoView, setIsRepoView] = useState(true);

  let { username } = useParams();

  const userClient = new UserClient(username);
  
  const [userData, repos] = useQueries([
    {
      queryKey: ["userData"],
      queryFn: () => userClient.getUserDetails(),
      initialData: [],
    },
    {
      queryKey: ["userRepos"],
      queryFn: () => userClient.getUserRepos(),
      initialData: [],
    },
  ]);

  return (
    <>
      <ProfileSideBar user={userData.data} />
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
        {!isRepoView && (
          <UserOverview username={username} userData={userData.data} />
        )}
        {isRepoView && (
          <RepoList
            repos={repos.data}
            isLoading={repos.isLoading}
            error={repos.error}
          />
        )}
      </div>
    </>
  );
};
export default UserPage;
