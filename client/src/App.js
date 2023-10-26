import { Routes, Route } from "react-router-dom";
import {
  Github,
  HouseHeart,
} from "react-bootstrap-icons";

import { useContext, createContext } from "react";

import HomePage from "./pages/HomePage/HomePage";
import RepoPage from "./pages/RepoPage/RepoPage";
import UserPage from "./pages/UserPage/UserPage";
import { SERVER_URL } from "./utils";
import "./App.css";

function App() {
  const isLoggedIn = document.cookie.includes("isGithubAuthenticated");
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
          <a class="btn btn-primary" href={`${SERVER_URL}/logout`}>
            Log out <Github style={{ marginBottom: "3px" }} />
          </a>
        )}
        {!isLoggedIn && (
          <a class="btn btn-primary" href={`${SERVER_URL}/auth/github`}>
            Sign in with Github <Github style={{ marginBottom: "3px" }} />
          </a>
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
