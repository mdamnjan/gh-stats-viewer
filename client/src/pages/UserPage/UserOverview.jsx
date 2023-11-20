import NumberChart from "../../components/Widgets/Charts/NumberChart";
import LineChart from "../../components/Widgets/Charts/LineChart";

import { useQueries } from "react-query";
import { UserClient } from "../../api";
import BarChart from "../../components/Widgets/Charts/BarChart";

const UserOverview = ({ username, userData }) => {
  const userClient = new UserClient(username);

  const [userEvents, userLanguages] = useQueries([
    {
      queryKey: ["userEvents"],
      queryFn: () => userClient.getUserEvents(),
      initialData: [],
      retry: false,
    },
    {
      queryKey: ["userLanguages"],
      queryFn: () => userClient.getUserLanguages(),
      initialData: [],
      retry: false,
    },
  ]);

  console.log("languages", userLanguages);

  return (
    <div>
      <div
        className="row row1"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <NumberChart
            title="Followers"
            data={userData.data.results.followers}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div>
        {/* <div>
          <NumberChart
            title="Following"
            data={userData.data.results.following}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div> */}
        <div>
          <NumberChart
            title="Public Repos"
            data={userData.data.results.public_repos}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div>
      </div>
      <div
        className="row row2"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <LineChart
            data={userEvents.data.results}
            isLoading={userData.isLoading}
            error={userData.error}
            title="User events"
            type="event"
          />
        </div>
        <div>
          <BarChart
            title="User Languages"
            data={userLanguages.data.results}
            isLoading={userLanguages.isLoading}
            error={userLanguages.error}
          />
        </div>
      </div>
    </div>
  );
};
export default UserOverview;
