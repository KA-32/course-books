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

  const handleSubmit = (e) => {
    props.addBook(userInput);
    setSearchQuerySelctionState(false);
    setUserInput("");
  };

  const onSelected = (value) => {
    setSearchQuerySelctionState(true);
  };

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = CourseBooks.search(userInput).map((value) => {
      return value.title;
    });
    
    setSearchQuerySelctionState(false);
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e) => {
    onSelected(e.target.getAttribute("data-value"));
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      onSelected();
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const suggestionsListComponent = () => {
    return (
      <ul className="auto-suggestions">
        {filteredSuggestions.length > 0 &&
          filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "auto-suggestion-val suggestion-active";
            } else {
              className = "auto-suggestion-val";
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        {filteredSuggestions.length === 0 && (
          <li className="auto-suggestion-val" key="no-suggestion">
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
          aria-owns="autoSuggestions"
          aria-autocomplete="both"
          aria-activedescendant=""
          value={userInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
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
      </div>
    </div>
  );
};

export default Autocomplete;
