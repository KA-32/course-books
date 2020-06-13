import React from "react";

import CourseBook from "../CourseBook/CourseBook";

import "./CourseList.css";

const CourseList = (props) => {
  return (
    <ul className="books-list">
      {props.books.map((value, index) => {
        return <CourseBook key={index} {...value} />;
      })}
    </ul>
  );
};

export default CourseList;
