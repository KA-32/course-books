import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

describe("App component", () => {
  test("Title Should be 'Search Books'", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Search Books/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("App to match snapshot", () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});
