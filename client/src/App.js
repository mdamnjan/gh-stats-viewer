import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Github } from "react-bootstrap-icons";

import HomePage from "./pages/HomePage";
import RepoPage from "./pages/RepoPage";
import UserPage from "./pages/UserPage";

function App() {
  const isLoggedIn = document.cookie.includes("isGithubAuthenticated");
  return (
      <div className="App" data-bs-theme="dark">
        <header className="App-header">
          {isLoggedIn && (
            <a class="btn btn-primary" href="http://localhost:4000/logout">
              Log out <Github style={{ marginBottom: "3px" }} />
            </a>
          )}
          {!isLoggedIn && (
            <a class="btn btn-primary" href="http://localhost:4000/auth/github">
              Sign in with Github <Github style={{ marginBottom: "3px" }} />
            </a>
          )}
        </header>
        <div id="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/:username" element={<UserPage />} />
              <Route path="/:username/:repo" element={<RepoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
