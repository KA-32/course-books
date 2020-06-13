import React, { useState, useEffect } from "react";

import SearchBox from "./components/SearchBox/SearchBox";
import CourseList from "./components/CourseList/CourseList";

import CourseBooks from "./utils/coursebooks";

import "./App.css";

const App = () => {
  const [filteredBooks, setBooks] = useState([]);

  useEffect(() => {
    CourseBooks.find("Practicing meditation");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = (value) => {
    let newCourseBook = CourseBooks.getCoursebook(value);
    let booksData = [...filteredBooks];

    booksData.push(newCourseBook);
    setBooks(booksData);
  };

  return (
    <section className="main-container" role="main">
      <h1 className="title">Search Books</h1>
      <SearchBox addBook={addBook} titles={CourseBooks.getTitles()} />
      <CourseList books={filteredBooks} />
    </section>
  );
};

export default App;
