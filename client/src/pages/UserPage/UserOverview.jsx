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
    },
  ]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {" "}
          <LineChart data={userEvents.data} title="User events" type="event" />
        </div>
        <div className="row">
          {" "}
          <div className="col-md-4 col-xs-12">
            <NumberChart title="Followers" data={userData.followers} />
          </div>
          <div className="col-md-4 col-xs-12">
            <NumberChart title="Following" data={userData.following} />
          </div>
          <div className="col-md-4 col-xs-12">
            <NumberChart title="Public Repos" data={userData.public_repos} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserOverview;
