import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import avatarIcon from "../../assets/ic-avatar.png";

import "./CourseBook.css";

/**
 * @param {title, author, description}
 * Show selected Course Book.
 */
const CourseBook = ({ index, title, author, description }) => {
  const [isReadMore, setReadMoreStatus] = useState(false);

  useEffect(() => {}, []);
  const handleReadMoreClick = (e) => {
    setReadMoreStatus(!isReadMore);
  };

  let listItemClassName =
    index > 0 && (index + 1) % 3 === 0 ? "book-item" : "book-item margin";

  return (
    <Fragment>
      <li className={listItemClassName}>
        <h2 className="title">{title}</h2>
        <div className="description-wrapper">
          <p className="description">
            {description.length > 300
              ? isReadMore
                ? description
                : description.substring(0, 300) + "..."
              : description}
          </p>
          {description.length > 300 && (
            <button className="read-more" onClick={handleReadMoreClick}>
              {isReadMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        <div className="avatar-wrapper">
          <img src={avatarIcon} alt="Author" className="author-image" />
          <p className="author-name">{author}</p>
        </div>
      </li>
      {index > 0 && (index + 1) % 3 === 0 && <li className="break"></li>}
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
