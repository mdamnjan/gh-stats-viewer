import { SearchHeart as Search } from "react-bootstrap-icons";

const HomePage = () => {
  const search = (e) => {
    // todo: call github api
    console.log(e.target.value);
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
    </div>
  );
};
export default HomePage;
