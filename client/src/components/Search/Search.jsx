import { useState } from "react";
import { useInfiniteQuery } from "react-query";

import SearchBar from "./SearchBar";
import { search } from "../../api";
import SearchResults from "./SearchResults";

const Search = ({ resource, resultsPerPage=10 }) => {
  const [searchTerm, setSearchTerm] = useState(null);

  const {
    data: searchResults,
    refetch: refetchResults,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`${resource}Search`, searchTerm],
    queryFn: (pageParam) =>
      search({
        resource: resource,
        searchTerm: searchTerm,
        page: pageParam,
        perPage: resultsPerPage
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.items.length < resultsPerPage) {
        return undefined;
      }
      return lastPage + 1;
    },
    initialData: { pages: undefined },
    enabled: false,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchTerm) {
            refetchResults();
          }
        }}
      >
        <SearchBar
          placeholderText={`Search for ${resource}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
      {searchResults.pages && (
        <SearchResults
          type="user"
          hasNextPage={hasNextPage}
          pages={searchResults.pages}
          error={error}
          showMore={(e) => {
            e.preventDefault();
            fetchNextPage();
          }}
        />
      )}
    </>
  );
};
export default Search;