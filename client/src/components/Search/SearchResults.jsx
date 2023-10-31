import SearchItem from "./SearchItem";

const SearchList = ({ type, page }) => {
  return page.data.items.map((item) => {
    return <SearchItem type={type} data={item} />;
  });
};

const SearchResults = ({ type, hasNextPage, pages, error, showMore }) => {
  if (error) {
    return <div class="search-results">{error && <p>{error.message}</p>}</div>;
  }

  const firstPage = pages[0].data;

  if (firstPage.total_count === 0) {
    return (
      <div class="search-results">
        <p class="fw-lighter">No search results found</p>
      </div>
    );
  }

  return (
    <div class="search-results">
      {
        <p class="fw-lighter">
          {firstPage.total_count.toLocaleString()} results found
        </p>
      }
      {pages.map((page) => (
        <SearchList type={type} page={page} />
      ))}
      {hasNextPage && (
        <button class="btn btn-secondary" onClick={showMore}>
          Show More
        </button>
      )}
    </div>
  );
};
export default SearchResults;
