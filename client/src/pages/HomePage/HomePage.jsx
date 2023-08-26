import axios from "axios";
import { useState } from "react";
import { SearchHeart as Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const navigate = useNavigate();

  const searchUsers = async (searchTerm, page) => {
    return await axios.get(
      `https://api.github.com/search/users?q=${searchTerm}&page=${page}&per_page=10`
    );
  };

  const search = (e) => {
    e.preventDefault();

    // only perform the search if the user types something in
    if (e.target.searchField.value) {
      searchUsers(e.target.searchField.value, 1).then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      });
    }
  };

  return (
    <div id="home-page-container">
      <div>
        <h1>Github Stats Viewer</h1>
        <p>
          See stats related to a Github user's profile and their repositories
        </p>
        <hr />
        <form onSubmit={search}>
          <div class="input-group mb-3 search-bar">
            <input
              name="searchField"
              type="search"
              class="form-control"
              placeholder="Search for a user"
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
      </div>
      <div class="search-results">
        {searchResults.items &&
          searchResults.items.map((user) => (
            <div
              onClick={() => navigate(`/users/${user.login}`)}
              data-bs-theme="dark"
              key={`user-${user.login}`}
              className="card search-result"
            >
              <img
                className="user-img"
                alt="user's avatar"
                src={user.avatar_url}
              ></img>
              <h1 style={{ display: "inline-block" }}> {user.login}</h1>
            </div>
          ))}
        {searchResults.length !== 0 && (
          <button class="btn btn-secondary" onClick={()=>setPageNum(pageNum+1)}>Show More</button>
        )}
      </div>
    </div>
  );
};
export default HomePage;
