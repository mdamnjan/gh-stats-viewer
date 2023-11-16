import { Routes, Route } from "react-router-dom";
import { Github, HouseHeart } from "react-bootstrap-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";

import HomePage from "./pages/HomePage/HomePage";
import RepoPage from "./pages/RepoPage/RepoPage";
import UserPage from "./pages/UserPage/UserPage";

import RateLimits from "./components/common/RateLimits";

import { SERVER_URL } from "./utils";
import "./App.css";

import { fetchData } from "./api";

function App() {
  const isLoggedIn = Cookies.get("isGithubAuthenticated");
  const { data: rateLimit } = useQuery({
    queryKey: ["rateLimit"],
    queryFn: () => fetchData("rate-limit"),
    initialData: {
      results: {
        resources: {
          search: { limit: 0, remaining: 0 },
          core: { limit: 0, remaining: 0 },
          graphql: { limit: 0, remaining: 0 },
        },
      },
    },
  });

  console.log("rate limit", rateLimit);

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "100px",
          }}
        ></div>
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
      <div id="container" style={{minHeight: "100vh"}}>
        <Routes>
          <Route
            path="*"
            element={
              <div
                style={{
                  width: "100%",
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3>Sorry, this page doesn't exist.</h3>
                <a href="/">Return to homepage</a>
              </div>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/repos/:username/:repo" element={<RepoPage />} />
        </Routes>
      </div>
      <footer data-bs-theme="dark" className="App-footer">
        <RateLimits rateLimit={rateLimit.results} />
      </footer>
    </div>
  );
}

export default App;
