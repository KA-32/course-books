import React from "react";
import { render } from "@testing-library/react";

import Autocomplete from "./Autocomplete";

describe("Autocomplete component", () => {
  test("button text should be 'Submit'", () => {
    const { getByText } = render(<Autocomplete />);
    const linkElement = getByText(/Submit/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("there should be one submit button", () => {
    const { getAllByText } = render(<Autocomplete />);
    const linkElement = getAllByText(/Submit/i);
    expect(linkElement.length).toBe(1);
  });

  test("input box should be present", () => {
    const { getByPlaceholderText } = render(<Autocomplete />);
    const linkElement = getByPlaceholderText(/Enter summary of book/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("there should be only one search input box should be present", () => {
    const { getAllByPlaceholderText } = render(<Autocomplete />);
    const linkElement = getAllByPlaceholderText(/Enter summary of book/i);
    expect(linkElement.length).toBe(1);
  });

  test("disable 'Submit' button if there is no search input", () => {
    const { getByText, getByPlaceholderText } = render(<Autocomplete />);
    const inputElement = getByPlaceholderText(/Enter summary of book/i);
    const submitButton = getByText(/Submit/i);
    expect(inputElement.getAttribute("value")).toBe("");
    expect(submitButton.getAttribute("disabled")).toBe("");
  });
});
