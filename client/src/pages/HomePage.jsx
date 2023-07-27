import axios from "axios";
import { useState } from "react";
import { SearchHeart as Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    // todo: call github api
    const searchUsers = async (searchTerm) => {
      return await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}`
      );
    };
    searchUsers(e.target.searchField.value).then((res) =>
      setSearchResults(res.data)
    );
  };

  return (
    <div data-bs-theme="dark" style={{ width: "80%", margin: "auto" }}>
      <h1>Github Stats Viewer</h1>
      <p>Get an overview of a Github user's account</p>
      <form onSubmit={search}>
        <div
          style={{ maxWidth: "500px", margin: "auto" }}
          class="input-group mb-3"
        >
          <input
            name="searchField"
            type="text"
            class="form-control"
            placeholder="Search for a Github user"
            aria-label="Searchbar"
            aria-describedby="basic-addon2"
          />
          <button type="submit" class="btn btn-primary" id="basic-addon2">
            <Search />
          </button>
        </div>
        {searchResults.total_count === 0 && (
          <p class="fw-lighter">No search results found</p>
        )}
      </form>
      <div class="search-results" style={{ width: "60%", margin: "auto" }}>
        {searchResults.items &&
          searchResults.items.map((user) => (
            <div
              onClick={() => navigate(`/users/${user.login}`)}
              data-bs-theme="dark"
              key={`user-${user.login}`}
              style={{ padding: "20px", display: "block" }}
              className="card"
            >
              <img
                style={{
                  borderRadius: "50%",
                  maxWidth: "100px",
                  display: "inline-block",
                  marginRight: "15px",
                }}
                alt="user's avatar"
                src={user.avatar_url}
              ></img>
              <h1 style={{ display: "inline-block" }}> {user.login}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};
export default HomePage;
