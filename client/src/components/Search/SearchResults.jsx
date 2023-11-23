import RepoList from "./RepoList";
import UserList from "./UserList";

const SearchResults = ({ type, hasNextPage, pages, error, showMore, isLoading }) => {
  if (error) {
    return <div class="search-results">{error && <p>{error.message}</p>}</div>;
  }
  if (!pages[0]) {
    return;
  }

  if (!pages[0].data) {
    return;
  }

  if (pages[0] && pages[0].data && pages[0].data.total_count === 0) {
    return (
      <div class="search-results">
        <p class="fw-lighter">No search results found</p>
      </div>
    );
  }
  const firstPage = pages[0].data;

  return (
    <div aria-label="Search Results" class="search-results">
      {
        <p class="fw-lighter">
          {firstPage.total_count.toLocaleString()} result(s) found {type==='repos' && "(excluding forks)"}
        </p>
      }
      {pages.map((page) =>
        type === "repos" ? (
          <RepoList repos={page.data.items} isLoading={isLoading} error={error} />
        ) : (
          <UserList users={page.data.items} />
        )
      )}
      {hasNextPage && (
        <button class="btn btn-secondary" onClick={showMore}>
          Show More
        </button>
      )}
    </div>
  );
};
export default SearchResults;
