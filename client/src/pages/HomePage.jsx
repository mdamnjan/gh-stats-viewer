import axios from "axios";
import { useState } from "react";
import { SearchHeart as Search } from "react-bootstrap-icons";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  const search = (e) => {
    e.preventDefault();
    // todo: call github api
    const searchUsers = async (searchTerm) => {
      return await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}`
      );
    };
    searchUsers(e.target.searchField.value).then((res)=>setUsers(res.data.items));
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
      </form>
      {users.map((user)=><div>{user.login}</div>)}
    </div>
  );
};
export default HomePage;
