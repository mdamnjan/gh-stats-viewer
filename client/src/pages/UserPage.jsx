import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { BarChartLine, JournalCode } from "react-bootstrap-icons";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import "../App.css";
import Tabs from "../components/Tabs/Tabs";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import BarChart from "../components/BarChart";
import Card from "../components/Card/Card";

const UserPage = () => {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [languages, setLanguages] = useState([]);

  const navigate = useNavigate();

  let { username } = useParams();

  const getRepos = async () => {
    const repos = await axios.get(
      `http://localhost:4000/repos?user=${username}`
    );
    setRepos(repos.data);
    const user = await axios.get(
      `http://localhost:4000/profile-stats?user=${username}`
    );
    setUserData(user.data);

    // if (repos && repos.data && repos.data[0]) {
    //   // console.log("repos data", repos.data);
    //   const repoData = await axios.get(
    //     `http://localhost:4000/repo-stats?user=${username}&repo=`
    //   );
    //   console.log(repoData.data);
    //   setLanguages(repoData.data.languages);
    // }
    return repos;
  };
  useEffect(() => {
    getRepos();
  }, []);

  return (
    <>
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
              onClick={() => navigate(`/${username}/${repo.name}`)}
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
    </>
  );
};
export default UserPage;
