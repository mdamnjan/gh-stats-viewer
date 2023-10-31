import NumberChart from "../../components/Widgets/Charts/NumberChart";
import LineChart from "../../components/Widgets/Charts/LineChart";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils";

const UserOverview = ({ username, userData }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("user data", userData);

  useEffect(() => {
    fetchData({
      url: `user-events?user=${username}&num_events=100`,
      setData: setUserEvents,
      setError: setError,
      setIsLoading: setIsLoading,
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {" "}
          <LineChart data={userEvents} title="User events" type="event" />
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
