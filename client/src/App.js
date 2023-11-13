import { Routes, Route } from "react-router-dom";
import { Github, HouseHeart, MoonStars, Sun } from "react-bootstrap-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";

import HomePage from "./pages/HomePage/HomePage";
import RepoPage from "./pages/RepoPage/RepoPage";
import UserPage from "./pages/UserPage/UserPage";
import { SERVER_URL } from "./utils";
import "./App.css";

import { fetchData } from "./api";
import { createContext, useState } from "react";

const ThemeContext = createContext("light");

const RateLimits = ({ rateLimit }) => {
  const limits = rateLimit.resources;
  return (
    <div>
      <div style={{ display: "block" }}>
        <span className="h5">{`Rate limits`}</span>
      </div>
      <div className="badge text-bg-secondary" style={{ marginBottom: "4px" }}>
        <span className="h6">
          {"Search"}: {`${limits.search.remaining}/${limits.search.limit}`}
        </span>
      </div>
      <div className="badge text-bg-secondary" style={{ marginBottom: "4px" }}>
        <span className="h6">
          {"REST"}: {`${limits.core.remaining}/${limits.core.limit}`}
        </span>
      </div>
      <div className="badge text-bg-secondary" style={{ marginBottom: "4px" }}>
        <span className="h6">
          {"GraphQL"}: {`${limits.graphql.remaining}/${limits.graphql.limit}`}
        </span>
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

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
    <div
      className="App"
      data-bs-theme={theme}
      style={{
        backgroundColor: theme === "dark" ? "#1e2025" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <header
        className="App-header"
        style={{
          backgroundColor:
            theme === "dark" ? "#16181c" : "rgba(33, 37, 41, 0.07",
          color: theme === "dark" ? "white" : "black",
        }}
      >
        <a
          class={`btn btn-${theme}`}
          href="/"
          style={{ position: "absolute", left: "20px" }}
        >
          <HouseHeart width={24} height={24} />
        </a>
        <div
          class="d-flex"
          style={{ float: "left", marginRight: "20px", alignItems: "center" }}
        >
          <Sun style={{ fill: theme === "dark" ? "white" : "black" }} />
          <div class="form-check form-switch form-check-inline">
            <input
              onClick={(e) => {
                console.log("val", e.target.value)
                
                setTheme(theme === "dark" ? "light" : "dark")}}
              class="form-check-input float-end"
              type="checkbox"
              role="switch"
              title="'Example button'"
              id="'example'"
            />
          </div>
          <MoonStars style={{ fill: theme === "dark" ? "white" : "black" }} />
        </div>
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
      <RateLimits rateLimit={rateLimit.results} />
      <div id="container">
        <ThemeContext.Provider value={theme}>
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
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
