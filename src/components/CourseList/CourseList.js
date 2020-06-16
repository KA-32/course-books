/**
 * Show books added to the list by user 
 */
import React from "react";
import PropTypes from "prop-types";

import CourseBook from "../CourseBook/CourseBook";

import "./CourseList.css";

const CourseList = ({ books }) => {
  return (
    <ul className="books-list">
      {books.map((value, index) => {
        return <CourseBook key={index} index={index} {...value} />;
      })}
    </ul>
  );
};

CourseList.propTypes = {
  books: PropTypes.array.isRequired,
};

CourseList.defaultProps = {
  books: [],
};

export default CourseList;
