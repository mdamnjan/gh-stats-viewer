import NumberChart from "../../components/Widgets/Charts/NumberChart";
import LineChart from "../../components/Widgets/Charts/LineChart";

import { useQueries } from "react-query";
import { UserClient } from "../../api";

const UserOverview = ({ username, userData }) => {
  const userClient = new UserClient(username);

  const [userEvents] = useQueries([
    {
      queryKey: ["userEvents"],
      queryFn: () => userClient.getUserEvents(),
      initialData: [],
      retry: false
    },
  ]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <LineChart
            data={userEvents.data.results}
            isLoading={userData.isLoading}
            error={userData.error}
            title="User events"
            type="event"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-xs-12">
          <NumberChart
            title="Followers"
            data={userData.data.results.followers}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div>
        <div className="col-md-4 col-xs-12">
          <NumberChart
            title="Following"
            data={userData.data.results.following}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div>
        <div className="col-md-4 col-xs-12">
          <NumberChart
            title="Public Repos"
            data={userData.data.results.public_repos}
            isLoading={userData.isLoading}
            error={userData.error}
          />
        </div>
      </div>
    </div>
  );
};
export default UserOverview;
