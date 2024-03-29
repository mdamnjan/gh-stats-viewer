import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";

import SearchBar from "./SearchBar";
import { search } from "../../api";
import SearchResults from "./SearchResults";

const Search = ({ resource, resultsPerPage = 10, user=undefined }) => {
  const [searchTerm, setSearchTerm] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: searchResults,
    refetch: refetchResults,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`${resource}Search`, searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      search({
        resource: resource,
        searchTerm: user? `${user}/${searchTerm}`: searchTerm,
        page: pageParam,
        perPage: resultsPerPage,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rateLimit"] }),
    getNextPageParam: (lastPage, pageParam) => {
      if (lastPage?.data?.items.length < resultsPerPage) {
        return undefined;
      }
      return pageParam.length + 1;
    },
    initialData: { pages: undefined },
    enabled: (user && resource==="repos"),
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
          type={resource}
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
