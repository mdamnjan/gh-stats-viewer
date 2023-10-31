import { SearchHeart as SearchIcon } from "react-bootstrap-icons";

const SearchBar = ({ placeholderText, onChange }) => {
  return (
    <div class="input-group mb-3 search-bar">
      <input
        name="searchField"
        type="search"
        class="form-control"
        placeholder={placeholderText}
        aria-label="Searchbar"
        aria-describedby="basic-addon2"
        onChange={onChange}
      />
      <button type="submit" class="btn btn-primary" id="basic-addon2">
        <SearchIcon />
      </button>
    </div>
  );
};
export default SearchBar;
