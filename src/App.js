import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import {
  addSearchQuery,
  addSearchResults,
  changeSortBy,
} from "./redux/actions";

function App({
  searchQuery,
  searchResults,
  addSearchQuery,
  addSearchResults,
  sortBy,
  changeSortBy,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [sortBy]);

  const handleChange = (event) => {
    const { value } = event.target;
    addSearchQuery(value);
  };

  const fetchAndAdd = (url) => {
    fetch(`${url}${searchQuery}&tags=story`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        addSearchResults(data.hits);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchResults = () => {
    if (searchQuery === "") {
      addSearchResults([]);
    } else if (sortBy === "relevance") {
      setLoading(true);
      fetchAndAdd("http://hn.algolia.com/api/v1/search?query=");
    } else {
      setLoading(true);
      fetchAndAdd("http://hn.algolia.com/api/v1/search_by_date?query=");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResults();
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
        <label htmlFor="sort">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => changeSortBy(e.target.value)}
          name="sort"
          id="sort"
        >
          <option value="relevance">By relevance</option>
          <option value="date">By date (more recent first)</option>
        </select>
      </form>
      <ol>
        {loading
          ? "Loading..."
          : searchResults
              .filter((result) => result.url)
              .map(({ objectID, url, created_at, title }) => (
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

const mapStateToProps = ({ searchQuery, searchResults, sortBy }) => ({
  searchQuery,
  searchResults,
  sortBy,
});

const mapDispatchToProps = (dispatch) => ({
  addSearchQuery: (searchQuery) => dispatch(addSearchQuery(searchQuery)),
  addSearchResults: (searchResults) =>
    dispatch(addSearchResults(searchResults)),
  changeSortBy: (sortByValue) => dispatch(changeSortBy(sortByValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
