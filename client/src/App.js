import { Routes, Route } from "react-router-dom";
import { Github, HouseHeart } from "react-bootstrap-icons";
import axios from "axios";
import Cookies from 'js-cookie';

import HomePage from "./pages/HomePage/HomePage";
import RepoPage from "./pages/RepoPage/RepoPage";
import UserPage from "./pages/UserPage/UserPage";
import { SERVER_URL } from "./utils";
import "./App.css";

function App() {
  const isLoggedIn = Cookies.get('isGithubAuthenticated');

  const handleLogin = () => {
    window.location = `${SERVER_URL}/auth/github`;
  };

  const handleLogout = () => {
    axios.get(`${SERVER_URL}/logout`, { withCredentials: true });
    window.location = "/";
  };
  return (
    <div className="App" data-bs-theme="dark">
      <header className="App-header">
        <a
          class="btn btn-dark"
          href="/"
          style={{ position: "absolute", left: "20px" }}
        >
          <HouseHeart width={24} height={24} />
        </a>
        {isLoggedIn && (
          <button class="btn btn-primary" onClick={handleLogout}>
            Log out <Github style={{ marginBottom: "3px" }} />
          </button>
        )}
        {!isLoggedIn && (
          <button class="btn btn-primary" onClick={handleLogin}>
            Sign in with Github <Github style={{ marginBottom: "3px" }} />
          </button>
        )}
      </header>
      <div id="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/:username/:repo" element={<RepoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
