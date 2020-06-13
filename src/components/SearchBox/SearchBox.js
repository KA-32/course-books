import React, { useState } from "react";

import AutoSuggestion from "../AutoSuggestion/AutoSuggestion";

import "./SearchBox.css";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchQuerySelected, setSearchQuerySelctionState] = useState(false);
  const [isSuggestionsVisible, setSuggestionsVisibility] = useState(true);

  const handleSubmit = (e) => {
    props.addBook(searchQuery);
    setSearchQuery("");
    setSearchQuerySelctionState(false);
  };

  const handleTextChange = (value) => {
    let filterTitles = props.titles.filter((title, index) => {
      return title.indexOf(value) > -1;
    });
    setSearchQuery(value);
    setSuggestionsVisibility(true);
    setSuggestions(filterTitles);
    setSearchQuerySelctionState(false);
  };

  const onSelected = (value) => {
    setSearchQuery(value);
    setSuggestionsVisibility(false);
    setSearchQuerySelctionState(true);
  };

  return (
    <div className="form-search">
      <form>
        <input
          type="text"
          aria-required="true"
          aria-label="Search box"
          name="book-search"
          placeholder="Enter book name"
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            handleTextChange(e.target.value);
          }}
        />
        {searchQuery && isSuggestionsVisible && (
          <AutoSuggestion onSelected={onSelected} data={suggestions} />
        )}
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={isSearchQuerySelected ? false : true}
          className="form-submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
