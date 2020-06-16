/**
 * Root component.
 * @component
 * Initialise view with required components.
 */
import React, { useState } from "react";

import SearchBox from "./components/SearchBox/SearchBox";
import CourseList from "./components/CourseList/CourseList";
import Autocomplete from "./components/AutoSuggestion/Autocomplete";


import CourseBooks from "./utils/coursebooks";

import "./App.css";

const App = () => {
  const [filteredBooks, setBooks] = useState([]);

  const addBook = (value) => {
    let newCourseBook = CourseBooks.getCoursebook(value);
    let booksData = [...filteredBooks];
    booksData.push(newCourseBook);
    setBooks(booksData);
  };

  return (
    <section className="main-container" role="main">
      <h1 className="title">Search Books</h1>
      {/* <SearchBox addBook={addBook} titles={CourseBooks.getAllTitles()} /> */}
      <Autocomplete addBook={addBook}/>
      <CourseList books={filteredBooks} />
    </section>
  );
};

export default App;
