import Search from "../../components/Search/Search";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div id="home-page-container">
      <div>
        <h1>GitHub Stats Viewer</h1>
        <p>
          See stats related to a GitHub user's profile and their repositories
        </p>
        <hr />
        <Search resource="users"/>
      </div>
    </div>
  );
};
export default HomePage;
