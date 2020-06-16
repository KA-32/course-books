import React, { Fragment } from "react";
import PropTypes from "prop-types";

import avatarIcon from "../../assets/ic-avatar.png";

import "./CourseBook.css";

/**
 * @param {title, author, description}
 * Show selected Course Book.
 */
const CourseBook = ({ index, title, author, description }) => {
  let listItemClassName = (index> 0 && (index+1) % 3 === 0) ? "book-item":"book-item margin"


  return (
    <Fragment>
      <li className={listItemClassName}>
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <div className="avatar-wrapper">
          <img src={avatarIcon} alt="Author" className="author-image" />
          <span className="author-name">{author}</span>
        </div>
      </li>
      {index> 0 && (index+1) % 3 === 0 && <li className="break"></li>}
    </Fragment>
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
