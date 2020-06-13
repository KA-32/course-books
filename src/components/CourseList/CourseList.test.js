import React from "react";
import { render } from "@testing-library/react";

import CourseList from "./CourseList";

describe("Course List", () => {
  test("Should be empty", () => {
    const books = [];
    const courseList = render(<CourseList books={books} />);
    expect(courseList).toMatchSnapshot();
  });

  test("Should have 2 children", () => {
    const books = [{title:"",author:"",description:""},{title:"",author:"",description:""}];
    const courseList = render(<CourseList books={books} />);
    expect(courseList).toMatchSnapshot();
  });
});
