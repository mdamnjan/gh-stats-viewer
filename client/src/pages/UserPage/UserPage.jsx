import { useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import { useParams } from "react-router-dom";
import { useQueries } from "react-query";
import { UserClient } from "../../api";

import "../../App.css";
import "./UserPage.css"

import BackButton from "../../components/common/BackButton";
import Tabs from "../../components/Tabs/Tabs";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import UserOverview from "./UserOverview";
import Search from "../../components/Search/Search";

const UserPage = () => {
  const [isRepoView, setIsRepoView] = useState(true);

  let { username } = useParams();

  const userClient = new UserClient(username);

  const [userData] = useQueries([
    {
      queryKey: ["userData"],
      queryFn: () => userClient.getUserDetails(),
      initialData: [],
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
        {isRepoView && <Search resource="repos" user={username} />}
      </div>
    </>
  );
};
export default UserPage;
