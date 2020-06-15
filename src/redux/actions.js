export const addSearchQuery = (searchQuery) => ({
  type: "ADD_SEARCH_QUERY",
  payload: searchQuery,
});

export const addSearchResults = (searchResults) => ({
  type: "ADD_SEARCH_RESULTS",
  payload: searchResults,
});
