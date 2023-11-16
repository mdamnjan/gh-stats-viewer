import { useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { UserClient } from "../../api";

import "../../App.css";

import BackButton from "../../components/common/BackButton";
import Tabs from "../../components/Tabs/Tabs";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import RepoList from "./RepoList";
import UserOverview from "./UserOverview";

const UserPage = () => {
  const [isRepoView, setIsRepoView] = useState(true);

  let { username } = useParams();

  const userClient = new UserClient(username);

  const [userData, repos] = useQueries([
    {
      queryKey: ["userData"],
      queryFn: () => userClient.getUserDetails(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["userRepos"],
      queryFn: () => userClient.getUserRepos(),
      initialData: { results: [] },
      retry: false,
    },
  ]);

  return (
    <>
      <BackButton to="/" />
      <ProfileSideBar
        user={userData.data.results}
        isLoading={userData.isLoading}
        error={userData.error}
      />
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
          <UserOverview username={username} userData={userData} />
        )}
        {isRepoView && (
          <RepoList
            repos={repos.data.results}
            isLoading={repos.isLoading}
            error={repos.error}
          />
        )}
      </div>
    </>
  );
};
export default UserPage;
