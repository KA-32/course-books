import React, { useState } from "react";

import SearchBox from "./components/SearchBox/SearchBox";
import CourseList from "./components/CourseList/CourseList";

import CourseBooks from "./utils/coursebooks";

import "./App.css";

const App = () => {
  const [filteredBooks, setBooks] = useState([]);

  // {
  //   author: "James Webb Young",
  //   description:
  //     "The Book in Three Sentences: An idea occurs when you develop a new combination of old elements. The capacity to bring old elements into new combinations depends largely on your ability to see relationships. All ideas follow a five-step process of 1) gathering material, 2) intensely working over the material in your mind, 3) stepping away from the problem, 4) allowing the idea to come back to you naturally, and 5) testing your idea in the real world and adjusting it based on feedback.",
  //   title: "The Nurture Assumption",
  // },
  // {
  //   author: "James Webb Young",
  //   description:
  //     "The Book in Three Sentences: An idea occurs when you develop a new combination of old elements. The capacity to bring old elements into new combinations depends largely on your ability to see relationships. All ideas follow a five-step process of 1) gathering material, 2) intensely working over the material in your mind, 3) stepping away from the problem, 4) allowing the idea to come back to you naturally, and 5) testing your idea in the real world and adjusting it based on feedback.",
  //   title: "The Nurture Assumption",
  // },
  // {
  //   author: "James Webb Young",
  //   description:
  //     "The Book in Three Sentences: An idea occurs when you develop a new combination of old elements. The capacity to bring old elements into new combinations depends largely on your ability to see relationships. All ideas follow a five-step process of 1) gathering material, 2) intensely working over the material in your mind, 3) stepping away from the problem, 4) allowing the idea to come back to you naturally, and 5) testing your idea in the real world and adjusting it based on feedback.",
  //   title: "The Nurture Assumption",
  // }

  const addBook = (value) => {
    let newCourseBook = CourseBooks.getCoursebook(value);
    let booksData = [...filteredBooks];
    booksData.push(newCourseBook);
    setBooks(booksData);
  };

  return (
    <section className="main-container" role="main">
      <h1 className="title">Search Books</h1>
      <SearchBox addBook={addBook} titles={CourseBooks.getAllTitles()} />
      <CourseList books={filteredBooks} />
    </section>
  );
};

export default App;
