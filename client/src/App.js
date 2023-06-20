import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import "./App.css";
import Tabs from "./components/Tabs/Tabs";
import ProfileSideBar from "./components/Profile/ProfileSideBar";
import BarChart from "./components/BarChart";
import Card from "./components/Card/Card";

function App() {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [languages, setLanguages] = useState([]);

  // TODO: this should be based on the searched user/repo
  const placeholderUser = "mdamnjan";
  const placeholderRepo = "mdamnjan.github.io"

  const getRepos = async () => {
    const repos = await axios.get(
      `http://localhost:4000/repos?user=${placeholderUser}`
    );
    setRepos(repos.data);
    const user = await axios.get(
      `http://localhost:4000/profile-stats?user=${placeholderUser}`
    );
    setUserData(user.data);

    if (repos && repos.data && repos.data[0]) {
      // console.log("repos data", repos.data);
      const repoData = await axios.get(
        `http://localhost:4000/repo-stats?user=${placeholderUser}&repo=${placeholderRepo}`
      );
      console.log(repoData.data)
      setLanguages(repoData.data.languages);
    }
    return repos;
  };
  useEffect(() => {
    getRepos();
  }, []);

  console.log(languages);

  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <ProfileSideBar user={userData} />
          <div className="contents">
            <Tabs
              tabs={[
                { text: "Overview", active: false, icon: <BarChartLine /> },
                { text: "Repositories", active: true, icon: <JournalCode /> },
              ]}
            />
            <div className="repo-list">
              {repos.map((repo) => (
                <Card
                  repo={repo}
                  activityTab={<BarChart inputData={languages} />}
                ></Card>
              ))}
              <div className="dashboard">
                <div data-bs-theme="dark" className="card">
                  <div className="card-body">
                    <h5 className="card-title">Public Repos</h5>
                    <h1>{userData?.public_repos}</h1>
                  </div>
                </div>
                <div data-bs-theme="dark" className="card">
                  <div className="card-body">
                    <h5 className="card-title">Followers</h5>
                    <h1>{userData?.followers}</h1>
                  </div>
                </div>
                <div data-bs-theme="dark" className="card">
                  <div className="card-body">
                    <BarChart inputData={languages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
