import React from "react";
import { render } from "@testing-library/react";

import CourseBook from "./CourseBook";

describe("Course Book", () => {
  test("Should match empty card.", () => {
    const courseBook = render(<CourseBook title="" author="" description="" />);
    expect(courseBook).toMatchSnapshot();
  });

  test("Should render props correctly", () => {
    const { getByText } = render(
      <CourseBook
        title="New Title"
        author="Test Author"
        description="Some description"
        index={0}
      />
    );
    const titleElement = getByText(/New Title/i);
    const authorElement = getByText(/Test Author/i);
    const descriptionElement = getByText(/Some description/i);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
