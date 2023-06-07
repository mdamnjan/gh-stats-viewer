import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";

import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import ProfileSideBar from "./components/Profile/ProfileSideBar";

function App() {
  const octokit = new Octokit({
    // use access token from env for now
    auth: process.env.REACT_APP_GH_ACCESS_TOKEN,
  });

  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  const getRepos = async () => {
    const repos = await octokit.request(
      `GET /users/${process.env.REACT_APP_GH_USER}/repos`
    );
    setRepos(repos.data);
    const user = await octokit.request(
      `GET /users/${process.env.REACT_APP_GH_USER}`
    );
    setUser(user.data);
    return repos;
  };
  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <ProfileSideBar user={user} />
          <div className="contents">
            <Tabs
              tabs={[
                { text: "Overview", active: false, icon: <BarChartLine /> },
                { text: "Repositories", active: true, icon: <JournalCode /> },
              ]}
            />
            {/* <div className="repo-list"> */}
            {/* {repos.map((repo) => (
                <Card repo={repo} />
              ))} */}
            <div className="dashboard">
              <div data-bs-theme="dark" className="card">
                <div className="card-body">
                  <h5 className="card-title">Public Repos</h5>
                  <h1>{user?.public_repos}</h1>
                </div>
              </div>
              <div data-bs-theme="dark" className="card">
                <div className="card-body">
                  <h5 className="card-title">Followers</h5>
                  <h1>{user?.followers}</h1>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
