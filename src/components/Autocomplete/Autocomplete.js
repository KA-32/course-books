import React, { Fragment, useState } from "react";

import CourseBooks from "../../utils/coursebooks";

import "./Autocomplete.css";

const Autocomplete = (props) => {
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = useState(false);
  // What the user has entered
  const [userInput, setUserInput] = useState("");
  const [isSearchQuerySelected, setSearchQuerySelctionState] = useState(false);
  const [numResults, setNumResultsToShow] = useState(3);

  const handleSubmit = (e) => {
    props.addBook(userInput);
    setSearchQuerySelctionState(false);
    setUserInput("");
  };

  const handleInputChange = (e) => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = CourseBooks.search(userInput, numResults).map(
      (value) => {
        return value.title;
      }
    );

    setSearchQuerySelctionState(false);
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const handleItemClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    setSearchQuerySelctionState(true);
  };

  const handleKeyDownpress = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      setSearchQuerySelctionState(true);
    } else if (e.keyCode === 38) {
      // User pressed the up arrow
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // User pressed the down arrow
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleRelevanceInputChange = (e) => {
    setNumResultsToShow(e.currentTarget.value);
  };

  const suggestionsListComponent = () => {
    return (
      <ul className="auto-suggestions">
        {filteredSuggestions.length > 0 &&
          filteredSuggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "auto-suggestion-item suggestion-active";
            } else {
              className = "auto-suggestion-item";
            }

            return (
              <li
                className={className}
                key={suggestion}
                onClick={handleItemClick}
              >
                {suggestion}
              </li>
            );
          })}
        {filteredSuggestions.length === 0 && (
          <li
            className="auto-suggestion-item no-suggestion"
            key="no-suggestion"
          >
            No suggestions found
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="form-search">
      <div>
        <input
          type="text"
          aria-required="true"
          aria-label="Search box"
          name="book-search"
          placeholder="Enter summary of book"
          className="search-input"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDownpress}
        />

        {showSuggestions && userInput && (
          <Fragment>{suggestionsListComponent()}</Fragment>
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
        <div className="show-results-count">
          <span>Showing Results:</span>
          <input
            type="number"
            aria-required="true"
            aria-label="Search box"
            name="book-search"
            placeholder="Number of Results to show"
            className="relevance-input"
            min={3}
            value={numResults}
            onChange={handleRelevanceInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
