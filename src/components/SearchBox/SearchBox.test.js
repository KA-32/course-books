import React from "react";
import { render } from "@testing-library/react";

import SearchBox from "./SearchBox";

describe("Seacrh Input Box", () => {
  test("Should match snapshot", () => {
    const titles = [];
    const searchBox = render(<SearchBox titles={titles} />);
    expect(searchBox).toMatchSnapshot();
  });
});
