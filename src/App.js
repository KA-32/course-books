import React, { useState, useEffect } from "react";

import localData from "./data/data.json";

import SearchBox from "./components/SearchBox/SearchBox";
import CourseList from "./components/CourseList/CourseList";
import Search from "./utils/search";

import "./App.css";

const App = () => {
  const [filteredBooks, setBooks] = useState([]);

  useEffect(() => {
    Search.find("Practicing meditation");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = (value) => {
    let newCourseBook = Search.getCoursebook(value);
    let booksData = [...filteredBooks];

    booksData.push(newCourseBook);
    setBooks(booksData);
  };

  return (
    <section className="main-container" role="main">
      <h1 className="title">Search Books</h1>
      <SearchBox addBook={addBook} titles={localData.titles} />
      <CourseList books={filteredBooks} />
    </section>
  );
};

export default App;
