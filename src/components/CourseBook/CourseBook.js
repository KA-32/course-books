import React from "react";
import PropTypes from "prop-types";

import avatarIcon from "../../assets/ic-avatar.png";

import "./CourseBook.css";

const CourseBook = (props) => {
  const { title, author, description } = props;

  return (
    <li className="book-item">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <div className="avatar-wrapper">
        <img src={avatarIcon} alt="Author" className="author-image" />
        <span className="author-name">{author}</span>
      </div>
    </li>
  );
};

CourseBook.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

CourseBook.defaultProps = {
  title: "",
  author: "",
  description: "",
};

export default CourseBook;
