import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { addSearchQuery, addSearchResults } from "./redux/actions";

function App({ searchQuery, searchResults, addSearchQuery, addSearchResults }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    addSearchQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        addSearchResults(data.hits);
      });
  };

  return (
    <div className="App">
      <h1>Search Hacker News Algolia API</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          id="search"
          onChange={handleChange}
          value={searchQuery}
          placeholder="Search"
        />
        <button type="submit">Go!</button>
      </form>
      <ol>
        {loading
          ? "Loading..."
          : searchResults.map(({ objectID, url, created_at, title }) => (
              <li key={objectID}>
                <a href={`${url}`}>
                  {created_at.split("T")[0]}—{title}
                </a>
              </li>
            ))}
      </ol>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchQuery: state.searchQuery,
  searchResults: state.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  addSearchQuery: (searchQuery) => dispatch(addSearchQuery(searchQuery)),
  addSearchResults: (searchResults) =>
    dispatch(addSearchResults(searchResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
