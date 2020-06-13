import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Title Should be 'Search Books'", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Search Books/i);
  expect(linkElement).toBeInTheDocument();
});
