import HomePage from "./pages/HomePage";
import RepoPage from "./pages/RepoPage";
import UserPage from "./pages/UserPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/:username" element={<UserPage />} />
              <Route path="/:username/:repo" element={<RepoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </header>
    </div>
  );
}

export default App;
