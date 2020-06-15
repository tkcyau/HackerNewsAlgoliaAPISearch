const INITIAL_STATE = {
  searchQuery: "",
  searchResults: [],
  sortBy: "relevance",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "ADD_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "CHANGE_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
