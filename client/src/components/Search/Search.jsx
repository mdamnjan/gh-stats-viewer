import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";

import SearchBar from "./SearchBar";
import { search } from "../../api";
import SearchResults from "./SearchResults";

const Search = ({ resource, resultsPerPage = 10, user = undefined }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const {
    data: searchResults,
    refetch: refetchResults,
    isRefetching,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`${resource}Search`],
    queryFn: ({ pageParam = 1 }) =>
      search({
        resource: resource,
        searchTerm: searchTerm,
        page: pageParam,
        perPage: resultsPerPage,
        user: user,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rateLimit"] }),
    getNextPageParam: (lastPage, pageParam) => {
      if (lastPage?.data?.items.length < resultsPerPage) {
        return undefined;
      }
      return pageParam.length + 1;
    },
    initialData: { pages: undefined },
    enabled: resource === "repos",
    refetchInterval: 0,
    cacheTime: 0,
    staleTime: 0
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetchResults();
        }}
      >
        <SearchBar
          placeholderText={
            resource === "users"
              ? "Search for a user/organization"
              : "Search for a repo"
          }
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
          isLoading={isLoading || isRefetching}
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
