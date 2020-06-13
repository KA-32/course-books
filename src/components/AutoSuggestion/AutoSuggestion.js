import React from "react";
import PropTypes from "prop-types";

import "./AutoSuggestion.css";

const AutoSuggestion = (props) => {
  const onSuggestedItemClick = (e) => {
    props.onSelected(e.target.getAttribute("data-value"));
  };

  return (
    <ul className="auto-suggestions">
      {props.data.map((value, index) => {
        return (
          <li
            className="auto-suggestion-val"
            onClick={onSuggestedItemClick}
            key={index}
            data-value={value}
            data-index={index}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};

AutoSuggestion.propTypes = {
  data: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
};

AutoSuggestion.defaultProps = {
  data: [],
};

export default AutoSuggestion;
